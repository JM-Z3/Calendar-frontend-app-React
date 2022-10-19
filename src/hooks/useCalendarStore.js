
import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
       
        try {
              //TODO UPDATE EVENT
            if(calendarEvent.id) {

                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent); 
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;

         } 

            //creando
            const { data} = await calendarApi.post('/events', calendarEvent);
            console.log(data);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

       
         
    }

    const startDeletingEvent = async() => {
        //todo llegar al backend
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
             dispatch(onDeleteEvent());
            
        } catch (error) {
            console.log(error);
            Swal.fire('No puedes eliminar eventos de otro user', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const {data} =  await calendarApi.get('/events');
            
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));




        } catch (error) {
            console.log('error cargando eventos');
            console.log(error)
        }
    }
    


    return {
        //properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}