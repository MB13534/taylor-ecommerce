import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({
  show,
  onHide,
  deleteHandler,
  title,
  body,
  cancelButton,
  cancelButtonColor,
  confirmButton,
  confirmButtonColor,
  userId,
}) => {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant={cancelButtonColor} onClick={onHide}>
            {cancelButton}
          </Button>
          <Button
            variant={confirmButtonColor}
            onClick={() => {
              onHide();
              deleteHandler(userId);
            }}
          >
            {confirmButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
