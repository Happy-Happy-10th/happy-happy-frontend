'use client';
import React, { useMemo, useRef, useState } from 'react';

import { CalendarEventType } from '@/@types/calendar';
import clsx from 'clsx';
import { UserEventForm } from '../Form';
import { CustomDialog } from '../CustomDialog';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/api';
import { extractYear } from '@/utils/calendar/extractDate';
import { calendarService } from '@/api/service/calendar';

import { CustomDrawer, CustomDrawerHandle, AlertRedIcon, SidePanelWrapper, SidePanel } from '@/components/base';
//자식 ui components
import DayEventListHead from './ui/DayEventListHead';
import DayEventBox from './ui/DayEventBox';
import { UserEventCheck } from '@/components/layouts/UserEventCheck';
import { useSidePanelStore } from '@/store';
import { useMediaQuery } from '@/hooks';
import CalendarSettingForm from '../Form/CalendarSettingFrom';

const datEvnetListStyle = clsx('relative rounded-[8px]', 'w-full h-full', 'bg-white', 'flex flex-col pl-5 pr-5 pb-5');

type PropsType = {
  selectedDate: Date;
  dayEvents: CalendarEventType[];
};

export default function DayEventList({ selectedDate, dayEvents }: PropsType) {
  // SidePanel 제어 훅
  const openPanel = useSidePanelStore(s => s.open);
  const panelType = useSidePanelStore(s => s.panelType);
  const panelEvent = useSidePanelStore(s => s.currentEvent);
  // 클릭으로 패널 열기
  const handlePanelOpenCheck = (event: CalendarEventType) => {
    openPanel('calendarRoot', 'check', { event });
  };
  const handlePanelOpenFix = (event: CalendarEventType) => {
    openPanel('calendarRoot', 'fix', { event });
  };

  //뷰포트 감시
  const BREAKPOINT = '1000px' as const;
  const isWide = useMediaQuery(`(min-width:${BREAKPOINT})`, true);

  // ref 배열을 useRef로 고정
  const viewDrawerRefs = useRef<React.RefObject<CustomDrawerHandle | null>[]>([]);
  const editDrawerRefs = useRef<React.RefObject<CustomDrawerHandle | null>[]>([]);

  // 삭제 다이얼로그 상태 관리
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; eventId: number | null }>({
    open: false,
    eventId: null,
  });

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => calendarService.deleteEvent(eventId),
    onSuccess: () => {
      // 삭제 성공 시 캘린더 데이터 새로고침
      const year = extractYear(selectedDate);
      queryClient.invalidateQueries({
        queryKey: queryKeys.calendar.events(year).queryKey,
      });
      setDeleteDialog({ open: false, eventId: null });
    },
    onError: error => {
      console.error('삭제 실패:', error);
      setDeleteDialog({ open: false, eventId: null });
    },
  });

  // 이벤트 수에 따라 ref를 초기화
  useMemo(() => {
    viewDrawerRefs.current = dayEvents.map(() => React.createRef<CustomDrawerHandle>());
    editDrawerRefs.current = dayEvents.map(() => React.createRef<CustomDrawerHandle>());
  }, [dayEvents]);

  return (
    <SidePanelWrapper anchorId="calendarRoot" className={datEvnetListStyle}>
      <DayEventListHead date={selectedDate} />
      <div className="flex flex-col gap-[10px] w-full overflow-y-auto flex-1 min-h-0">
        {dayEvents.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center text-yoteyo-m-detail-sm text-yoteyo-gray-300">
            <span>아직 등록된 일정이 없습니다</span>
          </div>
        ) : (
          dayEvents.map((event, index) => {
            const viewDrawerRef = viewDrawerRefs.current[index];
            const editDrawerRef = editDrawerRefs.current[index];
            if (isWide) {
              return (
                <div key={`dayelist_${index}`} onClick={() => handlePanelOpenCheck(event)}>
                  <DayEventBox event={event} />
                </div>
              );
            }

            return (
              <div key={`dayelist_${index}`}>
                <CustomDrawer
                  key={`dayelist_view_${index}`}
                  ref={viewDrawerRef}
                  trigger={<DayEventBox event={event} />}
                  contents={
                    <UserEventCheck
                      event={event}
                      onDelete={() => {
                        setDeleteDialog({ open: true, eventId: event.id });
                        viewDrawerRef.current?.close();
                      }}
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
                  contents={<UserEventForm event={event} mode="edit" />}
                  type="edit"
                />
              </div>
            );
          })
        )}
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <CustomDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, eventId: null })}
        onSubmit={() => {
          if (deleteDialog.eventId) {
            deleteMutation.mutate(deleteDialog.eventId);
          }
        }}
        icon={<AlertRedIcon />}
        mainMsg="일정을 정말로 삭제하시겠습니까?"
        subMsg="삭제된 일정은 복구할 수 없습니다."
        btntext="삭제"
      />
      <SidePanel anchorId="calendarRoot">
        {panelType === 'create' && <UserEventForm mode="create" />}
        {panelType === 'check' && panelEvent && (
          <UserEventCheck
            event={panelEvent}
            onDelete={() => {
              setDeleteDialog({ open: true, eventId: panelEvent.id });
            }}
            onEdit={() => handlePanelOpenFix(panelEvent)}
          />
        )}
        {panelType === 'fix' && panelEvent && <UserEventForm event={panelEvent} mode="edit" />}
        {panelType === 'setting' && <CalendarSettingForm />}
      </SidePanel>
    </SidePanelWrapper>
  );
}
