'use client'

import { CalendarEventType } from "@/@types/calendar";
import DayEventListHead from "./ui/DayEventListHead";
import DayEventBox from "./ui/DayEventBox";
import clsx from "clsx";
import { CustomDrawer, CustomDrawerHandle } from "@/components/base";
import UserEventCheck from "@/components/layouts/UserEventCheck";
import { UserEventForm } from "../Form";
import { useMemo, useRef } from "react";
import React from "react";

const datEvnetListStyle = clsx(
  "rounded-[8px]",
  "w-full h-full",
  "bg-white",
  "flex flex-col"
);

type PropsType = {
  selectedDate: Date;
  dayEvents: CalendarEventType[];
};

export default function DayEventList({ selectedDate, dayEvents }: PropsType) {
  // ✅ ref 배열을 useRef로 고정
  const viewDrawerRefs = useRef<React.RefObject<CustomDrawerHandle | null>[]>([]);
  const editDrawerRefs = useRef<React.RefObject<CustomDrawerHandle | null>[]>([]);

  // ✅ 이벤트 수에 따라 ref를 초기화
  useMemo(() => {
    viewDrawerRefs.current = dayEvents.map(() => React.createRef<CustomDrawerHandle>());
    editDrawerRefs.current = dayEvents.map(() => React.createRef<CustomDrawerHandle>());
  }, [dayEvents]);

  return (
    <div className={datEvnetListStyle}>
      <DayEventListHead date={selectedDate} />
      <div className="flex flex-col gap-[10px] w-full overflow-y-auto p-2 flex-1 min-h-0">
        {dayEvents.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center text-yoteyo-m-detail-sm text-yoteyo-gray-300">
            <span>아직 등록된 일정이 없습니다</span>
          </div>
        ) : (
          dayEvents.map((event, index) => {
            const viewDrawerRef = viewDrawerRefs.current[index];
            const editDrawerRef = editDrawerRefs.current[index];

            return (
              <div key={`dayelist_${index}`}>
                <CustomDrawer
                  key={`dayelist_view_${index}`}
                  ref={viewDrawerRef}
                  trigger={<DayEventBox event={event} />}
                  contents={
                    <UserEventCheck
                      event={event}
                      onEdit={() => {
                        viewDrawerRef.current?.close();
                        setTimeout(() => {
                          editDrawerRef.current?.open();
                        }, 100);
                      }}
                    />
                  }
                  type="view"
                />
                <CustomDrawer
                  key={`dayelist_edit_${index}`}
                  ref={editDrawerRef}
                  trigger={<div className="hidden" />}
                  contents={<UserEventForm event={event} mode="edit"/>}
                  type="edit"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
