const React = require('react')
const CreateSubmissionFileModal = require('../CreateSubmissionFileModal')
const { shallow } = require('enzyme')
const mockDispatch = require('lib/test-utils/mockDispatch')

const getProps = (p) => {
  return Object.assign({
    submissionId: 99,
    dispatch: mockDispatch,
    onClickConfirm: jest.fn(),
    onClickCancel: jest.fn(),
  }, p)
}

describe('CreateSubmissionFileModal', () => {
  it('renders the save button disabled when no file is selected', () => {
    let props = getProps()
    let wrapper = shallow(<CreateSubmissionFileModal {...props} />)
    let btn = wrapper.find('.CreateSubmissionFileModal-saveBtn')
    expect(btn.prop('disabled')).toEqual(true)
  })

  it('renders a loading icon and disabled buttons when saving', () => {
    let props = getProps()
    let wrapper = shallow(<CreateSubmissionFileModal {...props} />)
    wrapper.setState({ file: 'notNull' })
    let btn1 = wrapper.find('.CreateSubmissionFileModal-saveBtn')
    expect(btn1.prop('disabled')).toEqual(false)
    wrapper.setState({ isSaving: true })
    let btn2 = wrapper.find('.CreateSubmissionFileModal-saveBtn')
    expect(btn2.prop('disabled')).toEqual(true)
  })

  it('runs the onClickSave method when the save button is clicked', () => {
    let props = getProps()
    let wrapper = shallow(<CreateSubmissionFileModal {...props} />)
    let inst = wrapper.instance()
    spyOn(inst, 'onClickSave')
    // set the file to a value so the save button can be clicked
    wrapper.setState({ file: 'notNull' })
    // click the save button
    let btn = wrapper.find('.CreateSubmissionFileModal-saveBtn')
    btn.simulate('click')
    expect(inst.onClickSave).toHaveBeenCalled()
  })
})
