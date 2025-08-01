import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useOrderRequest } from "@/hooks/useOrderRequest";
import { useThemeColor } from "@/hooks/useThemeColor";
export interface WeekViewProps {
  readonly from: Date;
  readonly offerDays: string[];
  readonly orderDays: string[];
}

interface MonthDay {
  day: string;
  date: string;
  today: boolean;
  offer: boolean;
  order: boolean;
  isCurrentMonth: boolean;
}

export const DayFormat = "YYYY-MM-DD";

export default function MonthView({
  from,
  orderDays,
  offerDays,
}: WeekViewProps) {

  const blue = useThemeColor({}, 'blue');
  const lightBlue = useThemeColor({}, 'lightBlue');
  const orange = useThemeColor({}, 'orange');

  const styles = StyleSheet.create({
    status: {
      position: "absolute",
      borderRadius: 5,
      width: 15,
      aspectRatio: 1,
    },
    unavailable: {
      opacity: 0.5,
    },
    ordered: {
      top: -3,
      right: -3,
      backgroundColor: lightBlue,
    },
    orderedUnpaid: {
      top: -3,
      right: -3,
      backgroundColor: orange,
    },
    cancelled: {
      bottom: -3,
      left: -3,
      backgroundColor: "#666",
    },
    added: {
      bottom: -3,
      right: -3,
      backgroundColor: blue,
    },
    orderedText: {
      fontSize: 10,
      textAlign: "center",
      fontFamily: "poppins-bold",
      color: "#fff",
    },
    days: {
      marginVertical: 2,
      marginHorizontal: 2,
      alignSelf: "stretch",
    },
    weekHeader: {
      flexDirection: "row",
    },
    weekRow: {
      flexDirection: "row",
    },
    dayText: {
      textAlign: "center",
      fontSize: 13,
    },
    weekDayName: {
      textAlign: "center",
      color: "#aaa",
      fontFamily: "poppins-bold",
      textTransform: "uppercase",
      fontSize: 8,
    },
    selectedDay: {
      borderWidth: 2,
      borderColor: blue,
    },
    today: {
      color: "#555",
    },
    todayBackground: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: blue,
    },
    touchableBox: {
      backgroundColor: "#f6f6f6",
      aspectRatio: 1,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#f6f6f6",
      justifyContent: "center",
    },
    dayBox: {
      justifyContent: "center",
      marginHorizontal: 0,
    },
    otherMonthDay: {
      backgroundColor: "#f0f0f0",
      borderColor: "#f0f0f0",
      opacity: 0.4,
    },
    noOfferDay: {
      opacity: 0.4,
    },
    otherMonthText: {
      color: "#ccc",
    },
  });

  const [width, setWidth] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { submitOrder, loading } = useOrderRequest();
  
  const fromDate = new Date(from);
  const monthStart = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
  const monthEnd = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

  const firstMonday = new Date(monthStart);
  const dayOffset = (firstMonday.getDay() + 6) % 7;
  firstMonday.setDate(firstMonday.getDate() - dayOffset);

  const lastSunday = new Date(monthEnd);
  const endOffset = (7 - lastSunday.getDay()) % 7;
  lastSunday.setDate(lastSunday.getDate() + endOffset);

  const day = new Date(firstMonday);
  const days: MonthDay[] = [];

  while (day <= lastSunday) {
    const dateStr = day.toISOString().split("T")[0];
    const today = new Date();
    const isSameDay = day.toDateString() === today.toDateString();
    const isSameMonth = day.getMonth() === from.getMonth() && day.getFullYear() === from.getFullYear();

    days.push({
      day: String(day.getDate()).padStart(2, "0"),
      date: dateStr,
      today: isSameDay,
      offer: offerDays.includes(dateStr),
      order: orderDays.includes(dateStr),
      isCurrentMonth: isSameMonth,
    });

    day.setDate(day.getDate() + 1);
  }

  const weeks: MonthDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View
      style={styles.days}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {/* Week day header */}
      <View style={styles.weekHeader}>
        {weekDayNames.map((dayName) => (
          <View
            key={dayName}
            style={{
              width: width / 7,
              padding: 2,
            }}
          >
            <ThemedText style={styles.weekDayName}>{dayName[0]}</ThemedText>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <View key={`week-${week[0]?.date || weekIndex}`} style={styles.weekRow}>
          {week.map((d) => (
            <View
              style={{
                ...{
                  width: width / 7,
                  padding: 1,
                },
              }}
              key={d.date}
            >

              <Pressable
                style={{
                  ...styles.touchableBox,
                  ...(d.offer || !d.isCurrentMonth ? {} : styles.noOfferDay),
                  ...(d.isCurrentMonth ? {} : styles.otherMonthDay),
                  ...(d.today && d.isCurrentMonth
                    ? styles.todayBackground
                    : {}),
                }}
                onPress={() => {
                  //Alert.alert('PRESSED' + d);
                  if (d.isCurrentMonth) {
                    setSelectedDate(d.date);
                  }
                }}
              >
                <View style={styles.dayBox}>
                  {d.isCurrentMonth && (
                    <ThemedText
                      style={{
                        ...styles.dayText,
                        ...(d.today ? { fontWeight: "bold", color: blue } : {}),
                        ...(d.isCurrentMonth ? {} : styles.otherMonthText),
                        ...(selectedDate === d.date ? styles.selectedDay : {})
                      }}
                    >
                      {d.day}
                    </ThemedText>
                  )}
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      ))}

      {selectedDate && (
      <View style={{ padding: 10 }}>
        <ThemedText style={{ marginBottom: 10 }}>
          Zaznaczono: {selectedDate}
        </ThemedText>
        {loading ? (
        <ActivityIndicator size="small" color="#000000" />
      ) : (
        <Pressable
          style={{
            padding: 10,
            backgroundColor: blue,
            borderRadius: 6,
            alignItems: "center",
          }}
          onPress={() => {
            submitOrder(selectedDate);
          }}
        >
          <ThemedText style={{ color: "white" }}>Wyślij</ThemedText>
        </Pressable>
      )}
      </View>)}

    </View>
  );
}
