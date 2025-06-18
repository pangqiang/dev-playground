import { ColorPicker, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useThreeStore } from "../../store";
import { useEffect } from "react";

function Info() {
  const { selectedObj, updateMaterial } = useThreeStore();
  const [form] = useForm();

  // Handle color change in the form
  function handleColorChange(value) {
    const hexColor = value.color.toHexString();
    console.log('Color changed:', hexColor);

    updateMaterial(selectedObj.name, {
      color: hexColor,
    });
  }

  useEffect(() => {
    if (selectedObj?.isMesh) {
      form.setFieldsValue({
        color: selectedObj.material.color.getHexString(),
      });
    }

  }, [selectedObj]);

  return (
    <div className='Info'>
      {selectedObj?.isMesh ?
        <Form
          form={form}
          initialValues={{
            color: selectedObj.material.color.getHexString(),
          }}
          onValuesChange={handleColorChange}
        >
          <Form.Item label="Color" name="color">
            <ColorPicker />
          </Form.Item>

        </Form>
        : null
      }
    </div >
  )
}

export default Info;
