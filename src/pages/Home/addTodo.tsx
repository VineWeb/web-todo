import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Input, Divider, DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { ADD_TODO, UPDATE_TODO, CLOSE_ADD_TODO_MODAL } from '@/store/actionType';
import { levels } from '@/config';
const { RangePicker } = DatePicker;
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const AddTodo = ( { show, isAddStatus, onTodo, data } ) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({})
  useEffect(() => {
    const startTime = data?.startTime ? dayjs(data.startTime) : null
    const endTime = data?.endTime ? dayjs(data.endTime) : null
    let info = {}
    if (startTime) {
      info = Object.assign(data, {startTime})
    }
    if (endTime) {
      info = Object.assign(data, {endTime})
    }
    setInitialValues(info)
    return () => {
      setInitialValues({})
    }
  }, [data, form])
  const handleOk = () => {
    onTodo(CLOSE_ADD_TODO_MODAL)
  }
  const handleCancel = () => {
    onTodo(CLOSE_ADD_TODO_MODAL)
  }

  const onChangeStartTime = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  
  const onOkStartTime = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOkStartTime: ', value);
  };
  const onChangeEndTime = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  
  const onOkEndTime = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOkEndTime: ', value);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const title = isAddStatus ? '新增待办': '编辑待办'
  return (
    <>
      <Modal title={ title} open={show} footer={null}  onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        <Divider />
        <Form form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size='middle'
          preserve={false}
        >
          <Form.Item<FieldType>
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题!' }]}
          >
            <Input   placeholder='请输入标题'/>
          </Form.Item>

          <Form.Item<FieldType>
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入内容!' }]}
          >
            <Input.TextArea placeholder='请输入内容' />
          </Form.Item>
          <Form.Item<FieldType>
            label="优先级"
            name="level"
            rules={[{ required: true, message: '请选择标签!' }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择标签"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              options={levels}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="开始时间"
            name="startTime"
            rules={[{ required: false, message: '请输入开始时间!' }]}
          >
            <DatePicker placeholder='请选择开始时间' showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }} onChange={onChangeStartTime} onOk={onOkStartTime} />
          </Form.Item>
          <Form.Item<FieldType>
            label="结束时间"
            name="endTime"
            rules={[{ required: false, message: '请输入结束时间!' }]}
          >
            <DatePicker placeholder='请选择开始时间' showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }} onChange={ onChangeEndTime } onOk={ onOkEndTime } />
          </Form.Item>
          <Form.Item<FieldType>
            label="备注"
            name="comment"
            rules={[{ required: false }]}
          >
            <Input placeholder='备注' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }} shouldUpdate>
            { 
              () => (
                <Button type="primary" size='large' htmlType="submit" 
                style={{width: "100%"}}
                disabled={ !form.isFieldsTouched(['title', 'content', 'level'], true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                提交
              </Button>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddTodo