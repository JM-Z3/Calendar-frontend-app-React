import { addHours } from 'date-fns';
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#dadada',
            user: {
                _id: '123',
                name: 'Jonathan'
            }
        });
        openDateModal();
    }

  return (
    
    <button 
        className='btn btn-primary fab'
        onClick={handleClickNew}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
