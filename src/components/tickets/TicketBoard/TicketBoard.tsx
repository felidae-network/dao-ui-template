import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'; // Drag and drop library
import { Divider } from 'react-daisyui';

export const TicketBoard = () => {
  // Define your columns and tickets here
  const columnss = [
    {
      id: 'column-1',
      title: 'To Do',
      tickets: [{ id: 'ticket-1', title: 'Ticket 1' }],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tickets: [{ id: 'ticket-2', title: 'Ticket 2' }],
    },
    {
      id: 'column-3',
      title: 'Done',
      tickets: [{ id: 'ticket-3', title: 'Ticket 3' }],
    },
  ];
  const [columns, setColumns] = useState(columnss);

  const onDragEnd = (
    { destination, source, draggableId }: DropResult,
    _provider: ResponderProvided
  ) => {
    if (!destination) {
      return; // Item was dropped outside of any droppable area
    }

    setColumns((prevState) => {
      const sourceColumnIndex = prevState.findIndex(
        (column) => column.id === source.droppableId
      );
      const destinationColumnIndex = prevState.findIndex(
        (column) => column.id === destination.droppableId
      );

      const newColumns = [...prevState];

      const ticket = newColumns[sourceColumnIndex].tickets.find(
        (ticket) => ticket.id === draggableId
      );

      newColumns[sourceColumnIndex].tickets = newColumns[
        sourceColumnIndex
      ].tickets.filter((ticket) => ticket.id !== draggableId);

      newColumns[destinationColumnIndex].tickets.splice(
        destination.index,
        0,
        ticket!
      );

      return newColumns;
    });

    // TODO: Update the tickets array based on the drag result
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex'>
        {columns.map((column) => (
          <div key={column.id} className='flex-1 p-4'>
            <h2 className='text-lg font-semibold'>{column.title}</h2>
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='min-h-[400px] rounded p-2 shadow-md'
                >
                  {column.tickets.map((ticket, index) => (
                    <Draggable
                      key={ticket.id}
                      draggableId={ticket.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='mb-2 rounded p-2 shadow-md'
                        >
                          <Divider className='mt-0' />
                          <p>{ticket.title}</p>
                          <Divider className='mb-0' />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
