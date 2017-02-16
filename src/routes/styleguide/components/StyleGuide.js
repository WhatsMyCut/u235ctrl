const React = require('react')
const { Component, PropTypes } = React
const Sidebar = require('lib/components/Sidebar')
const ContentContainer = require('lib/components/ContentContainer')
const PageHeading = require('lib/components/PageHeading')
const GridItem = require('lib/components/GridItem')
const GridRow = require('lib/components/GridRow')
const Button = require('lib/components/Button')
const Icon = require('lib/components/Icon')
const Table = require('lib/components/Table')
const Modal = require('lib/components/Modal')
const ModalHeader = require('lib/components/ModalHeader')
const ModalBody = require('lib/components/ModalBody')
const ModalFooter = require('lib/components/ModalFooter')
const RowActions = require('lib/components/RowActions')
const DatetimePicker = require('lib/components/DatetimePicker')
const Breadcrumbs = require('lib/components/Breadcrumbs')

class StyleGuide extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {

    return (
      <div className="Authenticated">
        <Sidebar params={ this.props.params } location={ this.props.location } rerender={{}}/>
        <div className="Authenticated-content">
          <ContentContainer>
            <PageHeading title="Style Guide" />
            <div className="page-header">
              <h1>Typography</h1>
            </div>
            <h1>H1 Heading</h1>
            <h2>H2 Heading</h2>
            <p>
              Paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at felis sem. Sed eget varius sem. Praesent ullamcorper eleifend elit, non mattis tellus semper ut. Nam nec eros tellus. Integer a eros porta, auctor justo posuere, sollicitudin eros. Nam in diam mi. Fusce facilisis venenatis tortor. Curabitur est velit, malesuada eu accumsan vitae, placerat ac orci. Cras lorem enim, condimentum vel ultrices sit amet, mollis eu neque. Integer tristique congue tortor, eu ullamcorper risus lacinia ut. Aliquam erat volutpat. Phasellus ac lacinia nisl, nec tempus purus. In malesuada, eros ut pharetra eleifend, dolor augue aliquam sapien, sit amet tincidunt mi ex quis libero.
            </p>
          </ContentContainer>

          <ContentContainer>
            <PageHeading title="Buttons" />
            <h2>Regular Buttons</h2>
            <GridRow>
              <GridItem width={6}>
                <p><Button>Default</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button buttonType="cancel"><Icon name="cancel"></Icon> Cancel</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button buttonType="danger">Danger</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button buttonType="success"><Icon name="checkmark"></Icon> Save</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button buttonType="primary">Primary</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button buttonType="info">Secondary</Button></p>
              </GridItem>
            </GridRow>

            <h2>Large Buttons</h2>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="lg">Default</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="lg" buttonType="cancel"><Icon name="cancel"></Icon> Cancel</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="lg" buttonType="danger">Danger</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="lg" buttonType="success"><Icon name="checkmark"></Icon> Save</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="lg" buttonType="primary">Primary</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="lg" buttonType="info">Secondary</Button></p>
              </GridItem>
            </GridRow>

            <h2>Small Buttons</h2>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="sm">Default</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="sm" buttonType="cancel"><Icon name="cancel"></Icon> Cancel</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="sm" buttonType="danger">Danger</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="sm" buttonType="success"><Icon name="checkmark"></Icon> Save</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="sm" buttonType="primary">Primary</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="sm" buttonType="info">Secondary</Button></p>
              </GridItem>
            </GridRow>

            <h2>Extra Small Buttons</h2>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="xs">Default</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="cancel"><Icon name="cancel"></Icon> Cancel</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="danger">Danger</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="success"><Icon name="checkmark"></Icon> Save</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="primary">Primary</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="info">Secondary</Button></p>
              </GridItem>
            </GridRow>

            <h2>Extra Small Buttons</h2>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="xs">Default</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="cancel"><Icon name="cancel"></Icon> Cancel</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="danger">Danger</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="success"><Icon name="checkmark"></Icon> Save</Button></p>
              </GridItem>
            </GridRow>
            <GridRow>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="primary">Primary</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button size="xs" buttonType="info">Secondary</Button></p>
              </GridItem>
            </GridRow>

            <h2>Full Width Buttons</h2>
            <GridRow>
              <GridItem width={6}>
                <p><Button className="btn-block" buttonType="primary">Primary</Button></p>
              </GridItem>
              <GridItem width={6}>
                <p><Button className="btn-block" buttonType="info">Secondary</Button></p>
              </GridItem>
            </GridRow>

            <h2>Button Toolbar</h2>
            <div className="btn-toolbar">
              <Button size="lg" buttonType="primary">Primary</Button>
              <Button size="lg" buttonType="info">Secondary</Button>
              <Button size="lg" buttonType="danger">Delete</Button>
              <Button size="lg" buttonType="success"><Icon name="save" /> Save</Button>
              <Button size="lg" buttonType="cancel"><Icon name="x" /> Cancel</Button>
            </div>
          </ContentContainer>

          <ContentContainer>
            <PageHeading title="Breadcrumbs" />
            <Breadcrumbs
              items={[{
                url: '#/styleguide',
                text: 'Users'
              },{
                url: '#/styleguide',
                text: 'User Style'
              }{
                url: '#/styleguide',
                text: 'Details'
              }]} />
          </ContentContainer>

          <ContentContainer>
            <PageHeading title="Tables" />
            <Table
              rows={[
                {id: 11, firstName: 'John', lastName: 'Smith', status: 'normal'},
                {id: 12, firstName: 'John', lastName: 'Smith', status: 'error'},
                {id: 13, firstName: 'John', lastName: 'Smith', status: 'active'},
                {id: 14, firstName: 'John', lastName: 'Smith', status: 'normal'},
                {id: 15, firstName: 'John', lastName: 'Smith', status: 'normal'}
              ]}
              rowClassNameGetter={({rowData}) => {
                if (rowData.status == 'error') {
                  return 'danger'
                } else if (rowData.status == 'active') {
                  return 'active'
                }
              }}
              columns={[
                {
                  label: 'ID',
                  dataKey: 'id',
                  header: () => {
                    return <input type="checkbox" />
                  },
                  cell: () => {
                    return <input type="checkbox" />
                  }
                },
                {
                  label: 'ID',
                  dataKey: 'id',
                  header: () => {
                    return 'ID'
                  },
                  cell: ({rowData}) => {
                    return <a href="#">{rowData.id}</a>
                  }
                },
                {
                  label: 'First Name',
                  dataKey: 'firstName',
                  header: () => {
                    return 'First Name'
                  },
                  cell: ({ rowData }) => {
                    return <span>{ rowData.firstName }</span>
                  }
                },
                {
                  label: 'Sortable Column',
                  dataKey: 'lastName',
                  header: () => {
                    return <span>Name <Icon name="chevron-up" /></span>
                  },
                  cell: ({ rowData }) => {
                    return <span>{ rowData.lastName }</span>
                  }
                },
                {
                  label: 'Actions',
                  dataKey: '',
                  header: () => {
                    return 'Actions'
                  },
                  cell: () => {
                    return <RowActions
                      label={'dropdown'}
                      actions={[
                        {
                          text: 'Action 1',
                          url: '#',
                          onClick: () => {

                          }
                        },
                        {
                          text: 'Action 1',
                          url: '#',
                          onClick: () => {

                          }
                        }
                      ]}/>
                  }
                }
              ]} />
          </ContentContainer>

          <ContentContainer>
            <PageHeading title="Forms" />
              <form>
                <fieldset>
                  <legend>Field Set</legend>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Text</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select</label>
                        <select className="form-control">
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                        </select>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Multi Select</label>
                        <select className="form-control" multiple="multiple">
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                        </select>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Text Area</label>
                        <textarea className="form-control" rows="4"></textarea>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Checkboxes</label>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" id="inlineCheckbox1" value="option1" /> Yes
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" id="inlineCheckbox2" value="option2" /> No
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" id="inlineCheckbox3" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Radios</label>
                        <div className="radio">
                          <label>
                            <input type="radio" name="radios" id="inlineradio1" value="option1" /> Yes
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" name="radios" id="inlineradio2" value="option2" /> No
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" name="radios" id="inlineradio3" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Inline Checkboxes</label>
                        <div className="checkbox">
                          <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox1" value="option1" /> Yes
                          </label>
                          <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox2" value="option2" /> No
                          </label>
                          <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox3" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Inline Radio</label>
                        <div className="radio">
                          <label className="radio-inline">
                            <input type="radio" id="inlineRadio1" name="inline-radios" value="option1" /> Yes
                          </label>
                          <label className="radio-inline">
                            <input type="radio" id="inlineRadio2" name="inline-radios" value="option2" /> No
                          </label>
                          <label className="radio-inline">
                            <input type="radio" id="inlineRadio3" name="inline-radios" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Text</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Another Email" />
                          <span className="input-group-btn">
                            <button className="btn btn-danger" type="button"><span className="glyphicon glyphicon-remove"></span>&nbsp;</button>
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Another Email" />
                          <span className="input-group-btn">
                            <button className="btn btn-danger" type="button"><span className="glyphicon glyphicon-remove"></span>&nbsp;</button>
                          </span>
                        </div>

                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary btn-xs">Add Another</button>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="date">Date Picker</label>
                        <DatetimePicker
                          name="date"
                          value={ this.state.date }
                          onChange={(date) => {
                            this.setState({ date })
                          }}/>
                      </div>
                    </GridItem>
                  </GridRow>
                </fieldset>
                <fieldset>
                  <legend>Groups of Fields</legend>
                  <div className="well">
                    <GridRow>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                    </GridRow>
                    <GridRow>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                    </GridRow>
                    <div className="btn-toolbar">
                      <Button className="pull-right" size="xs" buttonType="danger">Delete Group</Button>
                    </div>
                  </div>
                  <div className="well">
                    <GridRow>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                    </GridRow>
                    <GridRow>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                      <GridItem width={6}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Text</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                      </GridItem>
                    </GridRow>
                    <div className="btn-toolbar">
                      <Button className="pull-right" size="xs" buttonType="danger">Delete Group</Button>
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Add Another Group</button>
                  </div>
                </fieldset>
              </form>
          </ContentContainer>

          <ContentContainer>
            <PageHeading title="Tabs" />
            <ul className="nav nav-tabs">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">Menu 1</a></li>
              <li><a href="#">Menu 2</a></li>
              <li><a href="#">Menu 3</a></li>
            </ul>
          </ContentContainer>

          <ContentContainer>
            <PageHeading title="Modals" />
            <h2>Regular Modal</h2>
            <Modal inline={true}>
              <ModalHeader title="Modal Title" />
              <ModalBody>
                Modal content
              </ModalBody>
              <ModalFooter>
                <Button buttonType="success">Save</Button>
                <Button buttonType="cancel">Cancel</Button>
              </ModalFooter>
            </Modal>

            <h2>Large Modal</h2>
            <Modal inline={true} size="lg">
              <ModalHeader title="Modal Title" />
              <ModalBody>
                Modal content
              </ModalBody>
              <ModalFooter>
                <Button buttonType="success">Save</Button>
                <Button buttonType="cancel">Cancel</Button>
              </ModalFooter>
            </Modal>

            <h2>Small Modal</h2>
            <Modal inline={true} size="sm">
              <ModalHeader title="Modal Title" />
              <ModalBody>
                Modal content
              </ModalBody>
              <ModalFooter>
                <Button buttonType="success">Save</Button>
                <Button buttonType="cancel">Cancel</Button>
              </ModalFooter>
            </Modal>

            <h2>Form Modal</h2>
            <Modal inline={true}>
              <ModalHeader title="Modal Title" />
              <ModalBody>
                <form>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Text</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Select</label>
                        <select className="form-control">
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                        </select>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Multi Select</label>
                        <select className="form-control" multiple="multiple">
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                          <option>Option</option>
                        </select>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Text Area</label>
                        <textarea className="form-control" rows="4"></textarea>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Checkboxes</label>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" id="inlineCheckbox1" value="option1" /> Yes
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" id="inlineCheckbox2" value="option2" /> No
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" id="inlineCheckbox3" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Radios</label>
                        <div className="radio">
                          <label>
                            <input type="radio" name="radios" id="inlineradio1" value="option1" /> Yes
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" name="radios" id="inlineradio2" value="option2" /> No
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" name="radios" id="inlineradio3" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                  </GridRow>
                  <GridRow>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Inline Checkboxes</label>
                        <div className="checkbox">
                          <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox1" value="option1" /> Yes
                          </label>
                          <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox2" value="option2" /> No
                          </label>
                          <label className="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox3" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem width={6}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Inline Radio</label>
                        <div className="radio">
                          <label className="radio-inline">
                            <input type="radio" id="inlineRadio1" name="inline-radios" value="option1" /> Yes
                          </label>
                          <label className="radio-inline">
                            <input type="radio" id="inlineRadio2" name="inline-radios" value="option2" /> No
                          </label>
                          <label className="radio-inline">
                            <input type="radio" id="inlineRadio3" name="inline-radios" value="option3" defaultChecked={true} /> Maybe
                          </label>
                        </div>
                      </div>
                    </GridItem>
                  </GridRow>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button buttonType="success">Save</Button>
                <Button buttonType="cancel">Cancel</Button>
              </ModalFooter>
            </Modal>

          </ContentContainer>
        </div>
      </div>
    )
  }
}


StyleGuide.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

module.exports = StyleGuide
