import { Popover } from "antd"

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Pop = (content) => {
  return (
    <Popover content={content} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>
  )
}

export default Pop;