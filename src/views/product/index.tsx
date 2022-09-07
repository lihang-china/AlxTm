/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-19 14:12:05
 * @LastEditors: Your Name
 * @LastEditTime: 2022-09-07 15:45:45
 */
import { Table, Form, Input, Button, Select ,Pagination} from 'antd';
import './style/index.scss'
export default function Product(props: any) {
  const columns = [{
    title: '序号'
  }, {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name'
  }
    , {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name'
  }
    , {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name'
  }]
  const data = [{
    name: 'Test Name'
  }]
  for (let i = 0; i < 10; i++) {
    data.push({
      name: 'Test Name' + i
    })
  }
  return (
    <div className='product app-container flex-column'>
      <Form layout='inline'>
        <Form.Item>
          <Input placeholder='请输入产品名称'></Input>
        </Form.Item>
        <Form.Item>
          <Select placeholder="请选择产品类别"></Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' >确认</Button>
        </Form.Item>
      </Form>
      <Table pagination={false} rowKey='name' dataSource={data} columns={columns} />
      <Pagination  showQuickJumper defaultCurrent={2} total={500} />
    </div>
  )
}