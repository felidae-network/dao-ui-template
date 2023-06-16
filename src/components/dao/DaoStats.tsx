import numeral from 'numeral';
import { Stats } from 'react-daisyui';

import { useGetContractBalance, useGetMemberList } from '@/hooks/messages';

import { LoadingSpinner } from '@/components/loading';

export const DaoStats = () => {
  const {
    loading: getMembersListLoading,
    decodedOutput: getMembersListDecodedOutput,
  } = useGetMemberList();

  const { loading: getBalanceLoading, decodedOutput: getBalanceOutput } =
    useGetContractBalance();

  return (
    <Stats vertical className='shadow'>
      <h3 className='py-2 text-center'>Stats</h3>
      <Stats.Stat>
        <Stats.Stat.Item variant='title'>Members count</Stats.Stat.Item>
        <Stats.Stat.Item variant='value'>
          {getMembersListLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {getMembersListDecodedOutput &&
              getMembersListDecodedOutput.value ? (
                <> {getMembersListDecodedOutput.value.length}</>
              ) : (
                'no data'
              )}
            </>
          )}
        </Stats.Stat.Item>
      </Stats.Stat>

      <Stats.Stat>
        <Stats.Stat.Item variant='title'>Contract Balance</Stats.Stat.Item>
        <Stats.Stat.Item variant='value'>
          {getBalanceLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {getBalanceOutput && getBalanceOutput.value ? (
                <>
                  {numeral(
                    parseFloat(getBalanceOutput.value.replace(/,/g, ''))
                  ).format('0.0a')}
                </>
              ) : (
                'no data'
              )}
            </>
          )}
        </Stats.Stat.Item>
      </Stats.Stat>
    </Stats>
  );
};
