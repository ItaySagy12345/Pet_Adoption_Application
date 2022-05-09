import { PeepPetsModalProps } from './IPeepPetsModalProps';
import Modal from '@mui/material/Modal';

function PeepPetsModal({ content, onClose }: PeepPetsModalProps) {
    return (
        <Modal open={content} onClose={onClose}>
            {content}
        </Modal>
    );
}

export default PeepPetsModal;