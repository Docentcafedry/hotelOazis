import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { Label, FormRow } from "../cabins/CreateCabinForm";

function UpdateSettingsForm() {
  return (
    <>
      <Form>
        <FormRow>
          <Label htmlFor="min-nights">Minimum nights/booking</Label>
          <Input type="number" id="min-nights" />
        </FormRow>
        <FormRow>
          <Label htmlFor="max-nights">Maximum nights/booking</Label>
          <Input type="number" id="max-nights" />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Label htmlFor="max-guests">Maximum guests/booking</Label>
          <Input type="number" id="max-guests" />
        </FormRow>
        <FormRow label="Breakfast price">
          <Label htmlFor="breakfast-price">Breakfast price</Label>
          <Input type="number" id="breakfast-price" />
        </FormRow>
      </Form>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" />
      </FormRow> */}
    </>
  );
}

export default UpdateSettingsForm;
