import Calendar from '@/components/calendar/Calendar';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { LANGUAGES } from "@/types/types";

const CalendarWithControls = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * Updates the current calendar date by adding or subtracting a specified number of months.
   *
   * @param {number} numberOfMonths - The number of months to shift the current date.
   *   - Positive values move the date forward.
   *   - Negative values move the date backward.
   *
   * @returns {void} This function updates the component's `currentDate` state with the new value.
   *
   * @example
   * changeMonthBy(1); // Moves currentDate forward by one month
   * changeMonthBy(-1); // Moves currentDate backward by one month
   */
function changeMonthBy(numberOfMonths: number) {
  const date = new Date(currentDate);
  date.setMonth(date.getMonth() + numberOfMonths);
  setCurrentDate(date);
}

  return (
    <View> 
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => changeMonthBy(-1)}
            style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
            <Ionicons name="chevron-back" size={20} color="black" />
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 10 }}>{`${new Intl.DateTimeFormat(LANGUAGES.PL, { month: 'long' }).format(currentDate)} ${currentDate.getFullYear()}`}</Text>

          <TouchableOpacity 
            onPress={() => changeMonthBy(1)}
            style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Calendar
          from={currentDate}
          offerDays={['2025-08-10','2025-08-11','2025-08-12','2025-08-15','2025-08-17','2025-08-18']}
          orderDays={[]}
        />
    </View>
  );
}

export default CalendarWithControls;