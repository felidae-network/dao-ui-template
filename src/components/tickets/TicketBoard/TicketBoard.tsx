import React, { useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'; // Drag and drop library
import { Button, Modal } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  IGetTicket,
  useGetTicketList,
} from '@/hooks/messages/useGetTicketList';

import { CreateTicket } from '@/components/tickets/CreateTicket';
import { Ticket } from '@/components/tickets/TicketBoard/components/Ticket';

import { TaskStatusEnum } from '@/types/enums/taskStatus.enum';

interface BoardColumn {
  id: string;
  title: string;
  tickets: IGetTicket[];
}

interface TicketStatusesObjType {
  [key: string]: {
    taskStatus: TaskStatusEnum;
    columnIndex: number;
  };
}

const allColumns: BoardColumn[] = Object.values(TaskStatusEnum).map(
  (ticketType) => ({
    id: ticketType,
    title: ticketType,
    tickets: [] as IGetTicket[],
  })
);

export const TicketBoard = () => {
  const { decodedOutput, refetch } = useGetTicketList();
  const [columns, _setColumns] = useState(allColumns);
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);

  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  const [selectedTicket, _setSelectedTicket] = useState<IGetTicket>();

  const columnsWithData = useMemo(() => {
    if (!decodedOutput) return columns;
    const _columns = columns;

    const ticketStatusesObj: TicketStatusesObjType = Object.keys(TaskStatusEnum)
      .filter((type) => isNaN(type as unknown as number))
      .reduce(
        (acc, curr, index) => ({
          ...acc,
          [curr]: { taskStatus: curr, columnIndex: index },
        }),
        {}
      );

    if (decodedOutput.value && decodedOutput.value.length) {
      decodedOutput.value.forEach((ticket) => {
        const columnIndex =
          ticketStatusesObj[ticket.ticketStatus as string].columnIndex;
        _columns[columnIndex].tickets.push(ticket);
      });
    }

    return _columns;
  }, [columns, decodedOutput]);

  const onDragEnd = (_result: DropResult, _provider: ResponderProvided) => {
    // if (!destination) {
    //   return; // Item was dropped outside of any droppable area
    // }
    // setColumns((prevState) => {
    //   const sourceColumnIndex = prevState.findIndex(
    //     (column) => column.id === source.droppableId
    //   );
    //   const destinationColumnIndex = prevState.findIndex(
    //     (column) => column.id === destination.droppableId
    //   );
    //   const newColumns = [...prevState];
    //   const ticket = newColumns[sourceColumnIndex].tickets.find(
    //     (ticket) => ticket.ticketId === draggableId
    //   );
    //   newColumns[sourceColumnIndex].tickets = newColumns[
    //     sourceColumnIndex
    //   ].tickets.filter((ticket) => ticket.ticketId !== draggableId);
    //   newColumns[destinationColumnIndex].tickets.splice(
    //     destination.index,
    //     0,
    //     ticket!
    //   );
    //   return newColumns;
    // });
    // TODO: Update the tickets array based on the drag result
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Modal
        open={createTicketModalVisible}
        onClickBackdrop={() => setCreateTicketModalVisible(false)}
      >
        <CreateTicket
          toggleVisible={() =>
            setCreateTicketModalVisible(!createTicketModalVisible)
          }
          refetchTickets={() => refetch()}
        />
      </Modal>

      {selectedTicket && (
        <Modal
          open={ticketModalVisible}
          onClickBackdrop={() => setTicketModalVisible(false)}
        >
          {/* ticket modal */}
          <div>{selectedTicket.name}</div>
        </Modal>
      )}

      <div className='flex overflow-x-scroll'>
        {columnsWithData.map((column) => (
          <div key={column.id} className='min-w-[350px] flex-1 p-4'>
            <h2 className='bg-base-300 rounded-t p-2 text-lg font-semibold'>
              {column.title}
            </h2>
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='bg-base-200 min-h-[400px] rounded rounded-t-none p-4 shadow-md'
                >
                  {column.tickets.map((ticket, index) => (
                    <Draggable
                      key={ticket.ticketId}
                      draggableId={ticket.ticketId}
                      index={index}
                    >
                      {(provided) => (
                        <Ticket provided={provided} ticket={ticket} />
                      )}
                    </Draggable>
                  ))}
                  {column.id === String(TaskStatusEnum.ToDO) && (
                    <Button
                      color='ghost'
                      className='mt-auto w-full'
                      startIcon={<AiOutlinePlus />}
                      onClick={() => setCreateTicketModalVisible(true)}
                    >
                      Create
                    </Button>
                  )}
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
