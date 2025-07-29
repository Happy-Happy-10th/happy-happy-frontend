import { MonthNavigator } from '@/components/features';
import type { Meta, StoryObj } from '@storybook/react';

import { useEffect, useState } from 'react';
import { subYears, addYears, setDate } from "date-fns";

const meta: Meta<typeof MonthNavigator> = {
  title: 'Components/MonthNavigator',
  component: MonthNavigator,
};

export default meta;
type Story = StoryObj<typeof MonthNavigator>;

export const monthNavigator: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const handleCurrentDate = (newDate:Date)=>{
      setCurrentDate(newDate);
    }
    const handlePrevYear = () => setCurrentDate((prev) => subYears(prev, 1));
    const handleNextYear = () => setCurrentDate((prev) => addYears(prev, 1));
    useEffect(()=>{
      console.log(currentDate);
    },[currentDate])
    return (
      <div>
        <MonthNavigator currentDate={currentDate} handleCurrentDate={handleCurrentDate} onPrevYear={handlePrevYear} onNextYear={handleNextYear}/>
      </div>
    );
  },
};