import { useGetAdmin, useGetDaoInfo } from '@/hooks/messages';
import { useGetContractAddress } from '@/hooks/messages/useGetContractaddress';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';
import { useGetMembersProject } from '@/hooks/messages/useGetMembersprojectList';
import { useGetMembersTicket } from '@/hooks/useGetMembersTicketList';

import { LoadingSpinner } from '@/components/loading';

import { useUser } from '@/context/user/UserContextProvider';
export const DaoInfo = () => {
  const { loading, decodedOutput } = useGetDaoInfo();
  const { loading: getDaoIdLoading, decodedOutput: getDaoIdOutput } =
    useGetDaoId();
  const { loading: getAdminLoading, decodedOutput: getAdminDecodedOutput } =
    useGetAdmin();
  // const { loading: l, decodedOutput: doc } = useAddStake({ amount: 1 });
  // console.log('loadingM', doc?.value);
  const { user } = useUser();
  const {
    loading: getDaoAddressLoading,
    decodedOutput: getDaoAddressDecodedOutput,
  } = useGetContractAddress();
  const {
    loading: getMembersTicketListLoading,
    decodedOutput: getMembersTicketListdecodeOutput,
  } = useGetMembersTicket({
    memberId: user?.memberId as unknown as number,
  });
  console.log(
    'getMembersTicketListdecodeOutput',
    getMembersTicketListdecodeOutput?.value
  );
  console.log('getMembersTicketListLoading', getMembersTicketListLoading);

  // const { loading:l, decodedOutput:doc } = useAddStake({amount:1});
  // console.log("loadingM",doc?.value);

  const {
    decodedOutput: decodecoutputProjectList,
    loading: loadingProjectList,
  } = useGetMembersProject({ memberId: user?.memberId as unknown as number });
  console.log('decodecoutputProjectList', decodecoutputProjectList?.value.Ok);
  console.log('loadingProjectList', loadingProjectList);

  return (
    <>
      <div className='flex-1 border-l-[1px] pl-10'>
        <div className='px-4 sm:px-0'>
          <h3>DAO Information</h3>
          <p className='mt-1 max-w-2xl text-sm leading-6'>
            DAO details and info.
          </p>
        </div>
        <div className='mt-6 border-t'>
          <dl className='divide-y'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Dao name</dt>
              <div className='mt-1 text-sm leading-6'>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.daoName}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <p className='text-sm font-medium leading-6'>Description</p>
              <div className='mt-1 text-sm leading-6'>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.description}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Profile</dt>
              <div className='mt-1 text-sm leading-6'>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.profile}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Website</dt>
              <div className='mt-1 text-sm leading-6 '>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.website}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Admin</dt>
              <div className='mt-1 text-sm leading-6'>
                {getAdminLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {getAdminDecodedOutput &&
                    !getAdminDecodedOutput.isError &&
                    getAdminDecodedOutput.value ? (
                      <p>{getAdminDecodedOutput.value}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>DaoId</dt>
              <div className='mt-1 text-sm leading-6'>
                {getDaoIdLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {getDaoIdOutput &&
                    !getDaoIdOutput.isError &&
                    getDaoIdOutput.value ? (
                      <p>{getDaoIdOutput.value}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Dao Address</dt>
              <div className='mt-1 text-sm leading-6'>
                {getDaoAddressLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {getDaoAddressDecodedOutput &&
                    !getDaoAddressDecodedOutput.isError &&
                    getDaoAddressDecodedOutput.value ? (
                      <p>{getDaoAddressDecodedOutput.value}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
