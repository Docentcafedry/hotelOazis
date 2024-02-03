import Modal from "./Modal";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open name="open-form">
        <Button variation="primary">Create Form</Button>
      </Modal.Open>
      <Modal.Window name="open-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
    // <Modal>
    //   <Button>Hello</Button>
    // </Modal>
  );
}

export default AddCabin;
