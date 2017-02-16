'use strict'
const validator = require('is-my-json-valid')
const _ = require('lodash')

module.exports = {

  filterJson: function(json, jsonSchema) {
    let jsonSchemaKeys = _.keys(jsonSchema.properties)
    return _.pick(json, jsonSchemaKeys)
  },

  /**
   * Expands a schema containing a $ref to a full schema
   * using an original schema with definitions
   * @param  {Object} schema         JSON Schema with $ref {$ref: "#/definitions/sample"}
   * @param  {Object} originalSchema JSON Schema containing ref definitions
   * @return {Object}                Expanded JSON Schema
   */
  expandRef: function(schema, originalSchema) {
    if (schema.$ref) {
      let path = schema.$ref.replace('#/', '').replace('/', '.')
      schema = _.get(originalSchema, path)
    }
    return schema
  },

  removeCombinations: function(schema) {
    return _.omit(schema, ['oneOf', 'allOf', 'anyOf', 'not'])
  },

  /**
   * Combine provided JSON schemas using a `oneOf` join
   * essentially an intersection of common properties and required fields
   * @param  {Array} schemas        Array of JSON
   * @param  {Object} originalSchema originalSchema oneOf was a part of
   * @return {Object}                Combined JSON Schema
   */
  combineOneOf: function(schemas, originalSchema) {
    schemas = _.map(schemas, (schema) => { return this.expandRef(schema, originalSchema) })
    schemas = _.map(schemas, (schema) => { return this.mergeCombinedSchema(schema, originalSchema) })
    return _.mergeWith({}, ...schemas, (ov, sv, key, o, s) => {

      // intersect properties to find fields to pivot
      if (key === 'properties' && _.isObject(o[key]) && _.isObject(s[key])) {
        let iKeys = _.intersection(_.keys(o[key]), _.keys(s[key]))

        return _.mergeWith({}, _.pick(o[key], iKeys), _.pick(s[key], iKeys), (ov, sv, key) => {

          // enum and enumNames should be unioned to retain all possible options
          if ('enum' === key && (_.isArray(ov) || _.isArray(sv))) {
            return _.uniq([''].concat(_.union(ov,sv)))
          }
          // enum and enumNames should be unioned to retain all possible options
          if ('enumNames' === key && (_.isArray(ov) || _.isArray(sv))) {
            return _.uniq(['-- Select One --'].concat(_.union(ov,sv)))
          }
        })
      }

      // intersect required fields
      if (key === 'required' && (_.isArray(o[key]) && _.isArray(s[key]))) {
        return _.intersection(ov, sv)
      }
    })
  },

  /**
   * Combine provided JSON schemas using an `allOf` join
   * essentially an union of common properties and required fields
   * @param  {Array} schemas        Array of JSON
   * @param  {Object} originalSchema originalSchema allOf was a part of
   * @return {Object}                Combined JSON Schema
   */
  combineAllOf: function(schemas, originalSchema) {
    schemas = _.map(schemas, (schema) => { return this.expandRef(schema, originalSchema) })
    schemas = _.map(schemas, (schema) => { return this.mergeCombinedSchema(schema) })

    return _.mergeWith({}, ...schemas, (ov, sv, key, o, s) => {
      // retain all required elements, default is to override same locations
      if (['required', 'enum', 'enumNames'].indexOf(key) !== -1 && (_.isArray(o[key]) || _.isArray(s[key]))) {
        return _.union(ov, sv)
      }
    })
  },

  /**
   * Combine schema containing combineKeys into one schema without
   * @param  {Object} jsonSchema JSON Schema with combine keys
   * @return {Object}            JSON Schema without combine keys
   */
  mergeCombinedSchema: function(jsonSchema, originalSchema) {
    originalSchema = originalSchema || jsonSchema
    jsonSchema = _.cloneDeep(jsonSchema)
    let combinedKeys = ['oneOf', 'allOf', 'anyOf', 'not']
    let combined = _.intersection(combinedKeys, _.keys(jsonSchema))
    if (combined.length !== 0) {
      let combinedSchemas = _.map(combined, (combineType) => {
        switch (combineType) {
        case 'allOf':
          return this.combineAllOf(jsonSchema[combineType], originalSchema)
        case 'oneOf':
          return this.combineOneOf(jsonSchema[combineType], originalSchema)
        }
      })

      // add original schema back less combinations
      combinedSchemas.push(this.removeCombinations(jsonSchema))

      //combine into one schema
      return this.combineAllOf(combinedSchemas, originalSchema)
    }
    return jsonSchema
  },

  /**
   * [description]
   * @param  {Object} json           JSON to fit JSON Schema against
   * @param  {[type]} fitProperties  [description]
   * @param  {[type]} jsonSchema     [description]
   * @param  {[type]} originalSchema [description]
   * @return {[type]}                [description]
   */
  fitBranch: function(json, fitProperties, jsonSchema, originalSchema) {
    if (fitProperties) {
      json = _.pick(json, fitProperties)
    }
    jsonSchema = _.cloneDeep(jsonSchema)
    let topCall = !originalSchema
    originalSchema = originalSchema || jsonSchema
    let combinedKeys = ['oneOf', 'allOf', 'anyOf', 'not']
    let combined = _.intersection(combinedKeys, _.keys(jsonSchema))
    if (combined.length !== 0) {
      combined = _.map(combined, (combineType) => {
        switch (combineType) {
        case 'allOf':
          return this.fitBranch(json, fitProperties, this.combineAllOf(jsonSchema[combineType], originalSchema), originalSchema)
        case 'oneOf':
          let schemas = jsonSchema[combineType]

          // Get the closest fit of all sub schemas
          let fitSchemas = _.map(schemas, (schema) => {
            return this.fitBranch(json, fitProperties, schema, originalSchema)
          })

          // Get number of errors for provided json for each schema
          let keyErrorCounts = _.map(fitSchemas, (schema) => {
            let validate = validator(schema, {verbose: true, greedy: true})
            validate(json)
            let failures = 0
            if (validate.errors && validate.errors.length) {
              _(_.keys(json))
                .each((jsonKey) => {
                  if (_.find(validate.errors, {field: 'data.' + jsonKey})) {
                    failures++
                  }
                })
            }
            return failures
          })

          let leastErrors = Math.min(...keyErrorCounts)

          // get the schemas with the least validation errors
          let closestSchemas = _(fitSchemas)
            .map((schema, index) => {
              if (keyErrorCounts[index] <= leastErrors) {
                return schema
              }
            })
            .without(undefined)
            .value()
          return this.combineOneOf(closestSchemas, originalSchema)
        }
      })
      combined = this.combineAllOf(combined, originalSchema)
      if (topCall) {
        combined = this.combineAllOf([this.mergeCombinedSchema(originalSchema), combined])
      }
      return combined
    }
    return jsonSchema
  }
}
