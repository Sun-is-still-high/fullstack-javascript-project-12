import { useSelector } from 'react-redux';
import AddChannelModal from './modals/AddChannelModal';
import RenameChannelModal from './modals/RenameChannelModal';
import RemoveChannelModal from './modals/RemoveChannelModal';

const modals = {
  addChannel: AddChannelModal,
  renameChannel: RenameChannelModal,
  removeChannel: RemoveChannelModal,
};

const ModalManager = () => {
  const { type } = useSelector((state) => state.modals);

  if (!type) return null;

  const Modal = modals[type];
  return <Modal />;
};

export default ModalManager;
