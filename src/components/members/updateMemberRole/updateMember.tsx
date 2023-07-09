// import { Dispatch, FormEvent, SetStateAction } from 'react';
// import { Button, Modal, Select } from 'react-daisyui';
// import { toast } from 'react-hot-toast';

// import { IGetMember } from '@/hooks/messages';
// import { useUpdateMemberRole } from '@/hooks/messages';

// import { useContract } from '@/context/contract/ContractContextProvider';
// import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

// import { MemberRoleEnum } from '@/types/enums';
// import { UpdateMemberRoleInput } from '@/types/schemaTypes';
// interface UpdateMemberRoleProps {
//   children?: React.ReactNode;
//   member: IGetMember;
//   toggleVisible: Dispatch<SetStateAction<boolean>>;
//   refetchMembers: () => void;
// }

// export const UpdateTicketStatus: React.FC<UpdateMemberRoleProps> = ({
//   toggleVisible,
//   refetchMembers,
// }) => {
//   const { contract } = useContract();
//   const { accounts } = useSubstrateState();
//   const { loading, mutate, argValues, setArgValues } = useUpdateMemberRole();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const mutateValue = await mutate();
//     if (mutateValue) {
//       if (mutateValue.isError)
//         return toast.error(mutateValue.decodedOutput || 'Something went wrong');

//       toast.success('Ticket status updated!');
//       refetchMembers();
//     }
//     setArgValues({} as UpdateMemberRoleInput);

//     toggleVisible(false);
//   };

//   return (
//     <>
//       <Modal.Header className='font-bold'>Update Member Role</Modal.Header>

//       <form onSubmit={handleSubmit}>
//         <Modal.Body>
//           <label className='label'>
//             <span className='label-text'> dao Address</span>
//           </label>
//           <Select
//             placeholder='Account Address'
//             className='w-full'
//             onChange={(event) =>
//               setArgValues({ ...argValues, daoAddress: event.target.value })
//             }
//           >
//             {accounts &&
//               accounts.map((account) => (
//                 <option key={account.address} value={account.address}>
//                   {account.meta.name}
//                 </option>
//               ))}
//           </Select>
//           <label className='label'>
//             <span className='label-text'> Member Address</span>
//           </label>
//           <Select
//             placeholder='Account Address'
//             className='w-full'
//             onChange={(event) =>
//               setArgValues({ ...argValues, daoAddress: event.target.value })
//             }
//           >
//             {accounts &&
//               accounts.map((account) => (
//                 <option key={account.address} value={account.address}>
//                   {account.meta.name}
//                 </option>
//               ))}
//           </Select>
//           <label className='label'>
//             <span className='label-text'> Member Role</span>
//           </label>
//           <Select
//             placeholder='Status'
//             className='w-full'
//             onChange={(event) =>
//               setArgValues({ ...argValues, role: event.target.value })
//             }
//           >
//             {Object.keys(MemberRoleEnum).map((memberrole) => (
//               <option
//                 value={memberrole}
//                 key={memberrole}
//                 selected={memberrole === memberrole}
//               >
//                 {MemberRoleEnum[memberrole as keyof typeof MemberRoleEnum]}
//               </option>
//             ))}
//           </Select>
//         </Modal.Body>

//         <Modal.Actions>
//           <Button loading={loading} type='submit'>
//             Update Ticket Status
//           </Button>
//         </Modal.Actions>
//       </form>
//     </>
//   );
// };

export {};
