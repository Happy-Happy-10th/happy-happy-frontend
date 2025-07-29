import { MonthNavigator } from '@/components/features';
import type { Meta, StoryObj } from '@storybook/react';

import { useEffect, useState } from 'react';

const meta: Meta<typeof MonthNavigator> = {
  title: 'Components/MonthNavigator',
  component: MonthNavigator,
};

export default meta;
type Story = StoryObj<typeof MonthNavigator>;

export const monthNavigator: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const handleCurrentDate = (updater: Date | ((prev: Date) => Date)) => {
      setCurrentDate(typeof updater === "function" ? updater(currentDate) : updater);
    };

    const handleMonthPickerOff = ()=>{}
    useEffect(()=>{
      alert(currentDate);
    },[currentDate])
    return (
      <div>
        <MonthNavigator 
        currentDate={currentDate} 
        handleCurrentDate={handleCurrentDate} 
        handleMonthPickerOff={handleMonthPickerOff}/>
      </div>
    );
  },
};