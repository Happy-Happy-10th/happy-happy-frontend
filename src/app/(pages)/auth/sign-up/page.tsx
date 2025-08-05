'use client';

import {
  Box,
  Button,
  Checkbox,
  CloseIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Icon,
  Input,
  Text,
} from '@/components/base';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Label } from '@/components/ui/label';
import React from 'react';

interface Props {}

function Page(props: Props) {
  const {} = props;

  const TERMS = `본 서비스(이하 “서비스”)는 「개인정보 보호법」 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 
이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.

---

1. 개인정보의 수집 항목 및 이용 목적

서비스는 회원가입, 로그인, 일정 관리 기능을 제공하기 위하여 다음의 개인정보를 수집합니다.

① 수집 항목  
- 필수항목: 이메일, 비밀번호  
- 선택항목: 이름, 닉네임 (향후 사용자 맞춤형 기능을 위한 기반)

② 이용 목적  
- 회원 식별 및 인증  
- 일정 등록 및 개인 캘린더 제공  
- 사용자 요청사항 처리 및 공지사항 전달

---

2. 개인정보의 보유 및 이용 기간

- 수집된 개인정보는 이용자의 탈퇴 요청 시까지 보관되며, 탈퇴 시 즉시 파기합니다.  
- 단, 관련 법령에 따라 일정 기간 보존이 필요한 경우, 해당 기간 동안 보관됩니다.  
  (예: 전자상거래법상 거래 기록 5년 등)

---

3. 개인정보의 제3자 제공

- 서비스는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.  
- 다만, 법령에 의거하거나 수사기관의 요청이 있을 경우에는 예외로 합니다.

---

4. 개인정보 처리 위탁

- 현재 개인정보 처리 업무를 외부 업체에 위탁하고 있지 않습니다.  
- 향후 위탁이 발생하는 경우, 위탁 대상과 내용은 본 방침에 추가 공지합니다.

---

5. 개인정보의 파기 절차 및 방법

- 이용자의 개인정보는 수집 목적 달성 시 또는 회원 탈퇴 시 지체 없이 파기합니다.  
- 전자적 파일 형태: 복구 불가능한 방식으로 삭제  
- 종이 문서: 분쇄 또는 소각 처리

---

6. 정보주체의 권리와 행사 방법

이용자는 언제든지 본인의 개인정보에 대해 다음과 같은 권리를 행사할 수 있습니다.

- 개인정보 열람, 정정, 삭제, 처리 정지 요청  
- 서비스 내 마이페이지 또는 고객센터를 통해 직접 요청 가능

---

7. 개인정보 보호를 위한 기술적·관리적 대책

- 비밀번호는 암호화 저장되어 있으며, 관리자도 확인할 수 없습니다.  
- 개인정보 접근 권한은 최소한의 인원으로 제한하고 있습니다.  
- SSL 암호화 통신 적용 및 주기적 보안 점검을 실시합니다.

---

8. 개인정보 보호책임자

- 이름: [담당자 이름]  
- 이메일: [담당 이메일]  
- 문의처: [전화번호 또는 연락 수단]

---

9. 개인정보 처리방침의 변경

- 본 방침은 [YYYY.MM.DD]부터 시행됩니다.  
- 내용 변경 시 서비스 내 공지를 통해 사전 안내합니다.
`;

  return (
    <AuthLayout>
      <Box className="w-full h-14 justify-center items-center relative">
        <Button size="icon" variant="icon" className="absolute left-5 w-6 h-6 rounded-none">
          <img src="/images/arrow-left.png" className="w-2 h-4" alt="뒤로가기 아이콘" />
        </Button>

        <Text variant="title3">회원가입</Text>
      </Box>

      <Box className="flex-col px-5 mt-6 gap-y-6.5">
        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>이름</Label>
          <Box className="flex-col gap-y-2">
            <Input placeholder="이름을 입력해주세요" />
            <Text variant="detail2" className="text-yoteyo-gray-200">
              * 한글은 10자, 영문은 20자 이내로 입력해 주세요
            </Text>
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>아이디</Label>
          <Box className="flex-col gap-y-2">
            <Input placeholder="이름을 입력해주세요" />
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>이메일</Label>
          <Box className="flex-col gap-y-2">
            <Input placeholder="이름을 입력해주세요" />
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>비밀번호</Label>
          <Box className="flex-col gap-y-2">
            <Input placeholder="이름을 입력해주세요" />
          </Box>
        </Box>

        <Box className="flex-col gap-y-3">
          <Label className={`gap-0 after:content-["*"] after:text-yoteyo-error`}>비밀번호 확인</Label>
          <Box className="flex-col gap-y-2">
            <Input placeholder="이름을 입력해주세요" />
          </Box>
        </Box>
      </Box>

      <Box className="flex-col mt-15 px-5 pb-12">
        <Box className="justify-between px-2">
          <Box className="gap-x-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">개인정보 수집 및 이용 동의(필수)</Label>
          </Box>
          <Dialog>
            <DialogTrigger>
              <Text variant="detail1" className="text-[#aaaaaa] underline">
                내용보기
              </Text>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="h-165 overflow-auto">
              <DialogTitle hidden />

              <Box className="justify-between">
                <Text>개인정보 처리방침</Text>
                <DialogClose>
                  <Icon>
                    <CloseIcon />
                  </Icon>
                </DialogClose>
              </Box>
              <Box dangerouslySetInnerHTML={{ __html: TERMS }}></Box>
            </DialogContent>
          </Dialog>
        </Box>
        <Button className="mt-4">가입완료</Button>
      </Box>
    </AuthLayout>
  );
}

export default Page;
