
import React from 'react'
import {useSelector} from 'react-redux';
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabDelete = () => {

    const {isDateModalOpen} = useSelector(state => state.ui);
    
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

  return (
    
    <button 
        className='btn btn-danger fab-danger'
        onClick={handleDelete}
        style={{
            display: hasEventSelected && isDateModalOpen === false ? '' : 'none'
        }}
    >
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
