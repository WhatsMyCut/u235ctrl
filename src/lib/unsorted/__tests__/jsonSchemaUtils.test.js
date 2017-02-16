const jsonSchemaUtils = require('../jsonSchemaUtils')

let complexSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Hold',
  description: 'Put a submission on hold for a period of time',
  definitions: {
    // these fields are common to each of the subschemas
    common: {
      type: 'object',
      properties: {
        limit: {
          type: 'integer',
          title: 'Fulfillment limit',
          minimum: 0,
          description: 'A maximum value in cents that can be dispersed for matched submissions'
        },
        // used to determine if the current submission would pass the limit threshold
        increment: {
          type: 'integer',
          title: 'Increment',
          minimum: 0,
          description: 'This number identifies the value or quantity of fulfillment for a submission'
        },

        from: {
          type: 'string',
          format: 'date-time',
          title: 'From',
          description: 'An ISO date starting point for a time range of submissions matches'
        },

        to: {
          type: 'string',
          format: 'date-time',
          title: 'To',
          description: 'An ISO date ending point for a time range of submissions matches'
        },

        programIds: {
          type: 'array',
          title: 'Program IDs',
          description: 'A list of program IDs to limit submissions matches',
          items: { type: 'integer' }
        },

        limitField: {
          type: 'string',
          title: 'Limit Field',
          description: 'The field to sum for the purposes of limit checking',
          enum: ['value', 'quantity']
        }
      },
      required: ['limit', 'increment', 'type', 'limitField']
    }
  },

  oneOf: [{
    // needs to have the common fields and type person, household, or family
    allOf: [
      { $ref: '#/definitions/common'},
      {
        type: 'object',
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['person', 'family', 'household'],
            enumNames: ['Person', 'Family', 'Household']
          }
        },
        required: ['type']
      }
    ]
  }, {
    // validate type custom and required customFields
    allOf: [
      { $ref: '#/definitions/common'},
      {
        type: 'object',
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['custom'],
            enumNames: ['Custom']
          },
          customFields: {
            type: 'array',
            title: 'Custom Fields',
            description: 'Custom fields to match specific submissions',
            items: {
              type: 'object',
              properties: {
                fieldName: {
                  title: 'Field Name',
                  type: 'string'
                },
                fieldType: {
                  title: 'Field Type',
                  type: 'string',
                  enum: [
                    'boolean',
                    'string',
                    'integer',
                    'date-time',
                    'email',
                    'uri'
                  ],
                  enumNames: [
                    'Boolean',
                    'String',
                    'Number',
                    'Date Time',
                    'Email',
                    'URL'
                  ]
                }
              },
              required: ['fieldName', 'fieldType']
            }
          }
        },
        required: ['customFields', 'type']
      }
    ]
  }]
}

let simpleSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  title: 'Age Validator',
  type: 'object',
  description: 'This step will reject a submission that does not pass the requirements based on configuration',
  properties: {
    asOfDateField: {
      type: 'string',
      title: 'As of Date Field',
      description: 'The field in the submission that holds a date value for comparison against min age and max age'
    },
    operator: {
      title: 'Operator',
      type: 'string',
      enum: ['greaterThan', 'lessThan', 'between'],
      enumNames: ['Greater Than', 'Less Than', 'Between']
    },
    minAge: {
      type: 'integer',
      title: 'Min Age'
    },
    maxAge: {
      type: 'integer',
      title: 'Max Age'
    }
  },
  required: [
    'asOfDateField',
    'operator'
  ]
}

describe('jsonSchemaUtils', () => {
  describe('combineAllOf', () => {
    it('returns a schema containing all properties and all required fields', () => {
      let mergedSchema = jsonSchemaUtils.combineAllOf(complexSchema.oneOf[0].allOf, complexSchema)
      let expectedSchema = {
        type: 'object',
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['person', 'family', 'household'],
            enumNames: ['Person', 'Family', 'Household']
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['value', 'quantity']
          }
        },
        required: ['limit', 'increment', 'type', 'limitField']
      }
      expect(mergedSchema).toEqual(expectedSchema)
    })

    it('returns a schema containing all properties and all required fields', () => {
      let mergedSchema = jsonSchemaUtils.combineAllOf(complexSchema.oneOf[1].allOf, complexSchema)
      let expectedSchema = {
        type: 'object',
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['custom'],
            enumNames: ['Custom']
          },
          customFields: {
            type: 'array',
            title: 'Custom Fields',
            description: 'Custom fields to match specific submissions',
            items: {
              type: 'object',
              properties: {
                fieldName: {
                  title: 'Field Name',
                  type: 'string'
                },
                fieldType: {
                  title: 'Field Type',
                  type: 'string',
                  enum: [
                    'boolean',
                    'string',
                    'integer',
                    'date-time',
                    'email',
                    'uri'
                  ],
                  enumNames: [
                    'Boolean',
                    'String',
                    'Number',
                    'Date Time',
                    'Email',
                    'URL'
                  ]
                }
              },
              required: ['fieldName', 'fieldType']
            }
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['value', 'quantity']
          }
        },
        required: ['limit', 'increment', 'type', 'limitField', 'customFields']
      }
      expect(mergedSchema).toEqual(expectedSchema)
    })
  })

  describe('combineOneOf', () => {
    it('returns a schema containing an intersection of properties and fields', () => {
      let mergedSchema = jsonSchemaUtils.combineOneOf(complexSchema.oneOf, complexSchema)
      let expectedSchema = {
        type: 'object',
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['', 'person', 'family', 'household', 'custom'],
            enumNames: ['-- Select One --', 'Person', 'Family', 'Household', 'Custom']
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['', 'value', 'quantity']
          }
        },
        required: ['limit', 'increment', 'type', 'limitField']
      }

      expect(mergedSchema).toEqual(expectedSchema)
    })
  })

  describe('mergeCombinedSchema', () => {
    it('returns the same schema if input is not a combined schema', () => {
      let mergedSchema = jsonSchemaUtils.mergeCombinedSchema(simpleSchema)
      expect(mergedSchema).toEqual(simpleSchema)
    })

    it('returns a properly merged schema containing only common fields', () => {
      let mergedSchema = jsonSchemaUtils.mergeCombinedSchema(complexSchema)
      let expectedSchema = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        title: 'Hold',
        description: 'Put a submission on hold for a period of time',
        definitions: {
          // these fields are common to each of the subschemas
          common: {
            type: 'object',
            properties: {
              limit: {
                type: 'integer',
                title: 'Fulfillment limit',
                minimum: 0,
                description: 'A maximum value in cents that can be dispersed for matched submissions'
              },
              // used to determine if the current submission would pass the limit threshold
              increment: {
                type: 'integer',
                title: 'Increment',
                minimum: 0,
                description: 'This number identifies the value or quantity of fulfillment for a submission'
              },

              from: {
                type: 'string',
                format: 'date-time',
                title: 'From',
                description: 'An ISO date starting point for a time range of submissions matches'
              },

              to: {
                type: 'string',
                format: 'date-time',
                title: 'To',
                description: 'An ISO date ending point for a time range of submissions matches'
              },

              programIds: {
                type: 'array',
                title: 'Program IDs',
                description: 'A list of program IDs to limit submissions matches',
                items: { type: 'integer' }
              },

              limitField: {
                type: 'string',
                title: 'Limit Field',
                description: 'The field to sum for the purposes of limit checking',
                enum: ['value', 'quantity']
              }
            },
            required: ['limit', 'increment', 'type', 'limitField']
          }
        },
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['', 'person', 'family', 'household', 'custom'],
            enumNames: ['-- Select One --', 'Person', 'Family', 'Household', 'Custom']
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['', 'value', 'quantity']
          }
        },
        required: ['limit', 'increment', 'type', 'limitField']
      }
      expect(mergedSchema).toEqual(expectedSchema)
    })
  })

  describe('fitBranch', () => {
    it('returns the same schema if input is not a combined schema', () => {
      let json = {
        maxAge: 22
      }
      let mergedSchema = jsonSchemaUtils.fitBranch(json, ['maxAge'], simpleSchema)
      expect(mergedSchema).toEqual(simpleSchema)
    })


    it('returns a schema with the branch matching the most fields', () => {
      let json = {
        type: 'person'
      }
      let mergedSchema = jsonSchemaUtils.fitBranch(json, ['type'], complexSchema)
      let expectedSchema = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        title: 'Hold',
        description: 'Put a submission on hold for a period of time',
        definitions: {
          // these fields are common to each of the subschemas
          common: {
            type: 'object',
            properties: {
              limit: {
                type: 'integer',
                title: 'Fulfillment limit',
                minimum: 0,
                description: 'A maximum value in cents that can be dispersed for matched submissions'
              },
              // used to determine if the current submission would pass the limit threshold
              increment: {
                type: 'integer',
                title: 'Increment',
                minimum: 0,
                description: 'This number identifies the value or quantity of fulfillment for a submission'
              },

              from: {
                type: 'string',
                format: 'date-time',
                title: 'From',
                description: 'An ISO date starting point for a time range of submissions matches'
              },

              to: {
                type: 'string',
                format: 'date-time',
                title: 'To',
                description: 'An ISO date ending point for a time range of submissions matches'
              },

              programIds: {
                type: 'array',
                title: 'Program IDs',
                description: 'A list of program IDs to limit submissions matches',
                items: { type: 'integer' }
              },

              limitField: {
                type: 'string',
                title: 'Limit Field',
                description: 'The field to sum for the purposes of limit checking',
                enum: ['value', 'quantity']
              }
            },
            required: ['limit', 'increment', 'type', 'limitField']
          }
        },
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['', 'person', 'family', 'household', 'custom'],
            enumNames: ['-- Select One --', 'Person', 'Family', 'Household', 'Custom']
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['', 'value', 'quantity']
          }
        },
        required: ['limit', 'increment', 'type', 'limitField']
      }
      expect(mergedSchema).toEqual(expectedSchema)
    })

    it('returns a schema with the branch matching the most fields', () => {
      let json = {
        type: 'custom'
      }
      let mergedSchema = jsonSchemaUtils.fitBranch(json, ['type'], complexSchema)
      let expectedSchema = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        title: 'Hold',
        description: 'Put a submission on hold for a period of time',
        definitions: {
          // these fields are common to each of the subschemas
          common: {
            type: 'object',
            properties: {
              limit: {
                type: 'integer',
                title: 'Fulfillment limit',
                minimum: 0,
                description: 'A maximum value in cents that can be dispersed for matched submissions'
              },
              // used to determine if the current submission would pass the limit threshold
              increment: {
                type: 'integer',
                title: 'Increment',
                minimum: 0,
                description: 'This number identifies the value or quantity of fulfillment for a submission'
              },

              from: {
                type: 'string',
                format: 'date-time',
                title: 'From',
                description: 'An ISO date starting point for a time range of submissions matches'
              },

              to: {
                type: 'string',
                format: 'date-time',
                title: 'To',
                description: 'An ISO date ending point for a time range of submissions matches'
              },

              programIds: {
                type: 'array',
                title: 'Program IDs',
                description: 'A list of program IDs to limit submissions matches',
                items: { type: 'integer' }
              },

              limitField: {
                type: 'string',
                title: 'Limit Field',
                description: 'The field to sum for the purposes of limit checking',
                enum: ['value', 'quantity']
              }
            },
            required: ['limit', 'increment', 'type', 'limitField']
          }
        },
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['', 'person', 'family', 'household', 'custom'],
            enumNames: ['-- Select One --', 'Person', 'Family', 'Household', 'Custom']
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['', 'value', 'quantity']
          },
          customFields: {
            type: 'array',
            title: 'Custom Fields',
            description: 'Custom fields to match specific submissions',
            items: {
              type: 'object',
              properties: {
                fieldName: {
                  title: 'Field Name',
                  type: 'string'
                },
                fieldType: {
                  title: 'Field Type',
                  type: 'string',
                  enum: [
                    'boolean',
                    'string',
                    'integer',
                    'date-time',
                    'email',
                    'uri'
                  ],
                  enumNames: [
                    'Boolean',
                    'String',
                    'Number',
                    'Date Time',
                    'Email',
                    'URL'
                  ]
                }
              },
              required: ['fieldName', 'fieldType']
            }
          }
        },
        required: ['limit', 'increment', 'type', 'limitField', 'customFields']
      }
      expect(mergedSchema).toEqual(expectedSchema)
    })

    it('returns a schema with the intersection of branches with indeterminent input', () => {
      let json = {
        limit: 5
      }
      let mergedSchema = jsonSchemaUtils.fitBranch(json, ['limit'], complexSchema)
      let expectedSchema = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        title: 'Hold',
        description: 'Put a submission on hold for a period of time',
        definitions: {
          // these fields are common to each of the subschemas
          common: {
            type: 'object',
            properties: {
              limit: {
                type: 'integer',
                title: 'Fulfillment limit',
                minimum: 0,
                description: 'A maximum value in cents that can be dispersed for matched submissions'
              },
              // used to determine if the current submission would pass the limit threshold
              increment: {
                type: 'integer',
                title: 'Increment',
                minimum: 0,
                description: 'This number identifies the value or quantity of fulfillment for a submission'
              },

              from: {
                type: 'string',
                format: 'date-time',
                title: 'From',
                description: 'An ISO date starting point for a time range of submissions matches'
              },

              to: {
                type: 'string',
                format: 'date-time',
                title: 'To',
                description: 'An ISO date ending point for a time range of submissions matches'
              },

              programIds: {
                type: 'array',
                title: 'Program IDs',
                description: 'A list of program IDs to limit submissions matches',
                items: { type: 'integer' }
              },

              limitField: {
                type: 'string',
                title: 'Limit Field',
                description: 'The field to sum for the purposes of limit checking',
                enum: ['value', 'quantity']
              }
            },
            required: ['limit', 'increment', 'type', 'limitField']
          }
        },
        properties: {
          type: {
            title: 'Type',
            description: 'The type of limit',
            type: 'string',
            enum: ['', 'person', 'family', 'household', 'custom'],
            enumNames: ['-- Select One --', 'Person', 'Family', 'Household', 'Custom']
          },
          limit: {
            type: 'integer',
            title: 'Fulfillment limit',
            minimum: 0,
            description: 'A maximum value in cents that can be dispersed for matched submissions'
          },
          // used to determine if the current submission would pass the limit threshold
          increment: {
            type: 'integer',
            title: 'Increment',
            minimum: 0,
            description: 'This number identifies the value or quantity of fulfillment for a submission'
          },

          from: {
            type: 'string',
            format: 'date-time',
            title: 'From',
            description: 'An ISO date starting point for a time range of submissions matches'
          },

          to: {
            type: 'string',
            format: 'date-time',
            title: 'To',
            description: 'An ISO date ending point for a time range of submissions matches'
          },

          programIds: {
            type: 'array',
            title: 'Program IDs',
            description: 'A list of program IDs to limit submissions matches',
            items: { type: 'integer' }
          },

          limitField: {
            type: 'string',
            title: 'Limit Field',
            description: 'The field to sum for the purposes of limit checking',
            enum: ['', 'value', 'quantity']
          }
        },
        required: ['limit', 'increment', 'type', 'limitField']
      }
      expect(mergedSchema).toEqual(expectedSchema)
    })
  })

})
