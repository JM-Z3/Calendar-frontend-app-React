import { useSelector, useDispatch } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }


    // idea de implementacion de un toggle
    // const toggleDateModal = () => {
    //     (isDateModalOpen)
    //         ? openDateModal()
    //         : closeDateModal();
    // }

    return {
        //properties
        isDateModalOpen,
        //methods
        openDateModal,
        closeDateModal
    }



}