import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { Label, FormRow } from "../cabins/CreateCabinForm";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { useUpdateSetting } from "./hooks/useUpdateSettingRow";

function UpdateSettingsForm() {
  const {
    data: {
      breakfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength,
    } = {},
    isLoading,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  const { updateSetting, isLoadingUpdateSetting } = useUpdateSetting();

  function handleUpdate(e, setting) {
    const { value } = e.target;
    // console.log(setting, value);
    if (!value) return;
    updateSetting({ [setting]: Number(value) });
  }

  return (
    <>
      <Form>
        <FormRow>
          <Label htmlFor="min-nights">Minimum nights/booking</Label>
          <Input
            type="number"
            id="min-nights"
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            defaultValue={minBookingLength}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="max-nights">Maximum nights/booking</Label>
          <Input
            type="number"
            id="max-nights"
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
            defaultValue={maxBookingLength}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Label htmlFor="max-guests">Maximum guests/booking</Label>
          <Input
            type="number"
            id="max-guests"
            onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
            defaultValue={maxGuestPerBooking}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Label htmlFor="breakfast-price">Breakfast price</Label>
          <Input
            type="number"
            id="breakfast-price"
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
            defaultValue={breakfastPrice}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
