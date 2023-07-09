import React, { useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'; // Drag and drop library
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';

import { useUpdateTaskStatus } from '@/hooks/messages';
import {
  IGetTicket,
  useGetTicketList,
} from '@/hooks/messages/useGetTicketList';

import { CreateTicket } from '@/components/tickets/CreateTicket';
import {
  Ticket,
  TicketModal,
} from '@/components/tickets/TicketBoard/components';

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

const allColumns: BoardColumn[] = Object.keys(TaskStatusEnum).map(
  (ticketType) => ({
    id: ticketType,
    title: ticketType,
    tickets: [] as IGetTicket[],
  })
);

export const TicketBoard = () => {
  // const { contract } = useContract();
  const { decodedOutput, refetch } = useGetTicketList();
  const {
    setArgValues,
    mutate,
    loading: _updateStatusLoading,
  } = useUpdateTaskStatus();
  const [columns, _setColumns] = useState(allColumns);
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);

  console.log(
    'asdas ',
    Object.keys(TaskStatusEnum).indexOf(
      TaskStatusEnum.ToDO
    ) as unknown as string
  );

  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<IGetTicket>();

  const columnsWithData = useMemo(() => {
    if (!decodedOutput) return columns;
    const _columns = columns.map((column) => ({
      ...column,
      tickets: [] as IGetTicket[],
    }));

    const ticketStatusesObj: TicketStatusesObjType = Object.keys(
      TaskStatusEnum
    ).reduce(
      (acc, curr, index) => ({
        ...acc,
        [curr]: { taskStatus: curr, columnIndex: index },
      }),
      {}
    );

    if (
      decodedOutput.value &&
      !decodedOutput.isError &&
      decodedOutput.value.length
    ) {
      decodedOutput.value.forEach((ticket) => {
        const columnIndex =
          ticketStatusesObj[ticket.ticketStatus as string].columnIndex;
        _columns[columnIndex].tickets.push(ticket);
      });
    }

    return _columns;
  }, [columns, decodedOutput]);

  const onDragEnd = async (
    { destination, draggableId }: DropResult,
    _provider: ResponderProvided
  ) => {
    if (!destination) {
      return; // Item was dropped outside of any droppable area
    }

    setArgValues({
      // daoAddress: contract.address?.toString(),
      ticketId: draggableId,
      ticketStatus: destination.droppableId,
    });

    const mutateValue = await mutate();
    console.log('mutateValue ', mutateValue);

    if (mutateValue) {
      if (mutateValue.isError) return toast.error(mutateValue.decodedOutput);

      toast.success(mutateValue.decodedOutput);
      refetch();
    }
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
          className='w-11/12 max-w-5xl'
        >
          <TicketModal
            closeModal={() => setTicketModalVisible(false)}
            ticket={selectedTicket}
          />
        </Modal>
      )}

      <div className='flex overflow-x-scroll'>
        {columnsWithData.map((column) => (
          <div key={column.id} className='min-w-[350px] flex-1 p-4'>
            <h2 className='bg-base-300 rounded-t p-2 text-lg font-semibold'>
              {TaskStatusEnum[column.title as keyof typeof TaskStatusEnum]}
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
                        <Ticket
                          openTicketModal={() => {
                            setSelectedTicket(ticket);
                            setTicketModalVisible(true);
                          }}
                          provided={provided}
                          ticket={ticket}
                        />
                      )}
                    </Draggable>
                  ))}
                  {column.id === Object.keys(TaskStatusEnum)[0] && (
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
