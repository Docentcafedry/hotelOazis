import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useDeleteCabin } from "./hooks/useDeleteCabinHook";
import { useCreateCabin } from "./hooks/useCreateCabinHook";
import { HiCash } from "react-icons/hi";
import { HiDocumentAdd } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const StyledCabinRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  const { deleteCabin, isLoadingDeletion } = useDeleteCabin();
  const { createCabin, isCreatingLoading } = useCreateCabin();

  function createDublicateHandler() {
    // const newObj = {
    //   name: `Dublicate ${name}`,
    //   maxCapacity,
    //   regularPrice,
    //   discount,
    //   description,
    //   image,
    // };

    // console.log(newObj);
    createCabin({
      name: `Dublicate ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }
  return (
    <>
      <StyledCabinRow>
        <Img src={image} alt={name}></Img>
        <Cabin>{name}</Cabin>
        <div>{maxCapacity} persons</div>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle menuId={id}></Menus.Toggle>
              <Menus.MenuList menuId={id}>
                <Menus.Button onClick={createDublicateHandler}>
                  <HiCash />
                </Menus.Button>
                <Modal.Open name="edit">
                  <Menus.Button>
                    <HiDocumentAdd />
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open name="confirm-deletion">
                  <Menus.Button>
                    <HiOutlineTrash />
                  </Menus.Button>
                </Modal.Open>
              </Menus.MenuList>
            </Menus.Menu>
            <Modal.Window name="edit">
              <CreateCabinForm
                cabin={cabin}
                isActive={isEditing}
                setActive={true}
              />
            </Modal.Window>
            <Modal.Window name="confirm-deletion">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(id)}
                disabled={isLoadingDeletion}
              />
            </Modal.Window>
          </Modal>
        </div>
      </StyledCabinRow>
    </>
  );
}
