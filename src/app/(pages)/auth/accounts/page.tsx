'use client';

import { Box, Button, Input, Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@/components/base';
import { FindUserIdForm, FindUserPassWordForm } from '@/components/features/Form';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Label } from '@/components/ui/label';
import { parseAsString, useQueryState } from 'nuqs';
import React from 'react';
import { useForm } from 'react-hook-form';

function Page() {
  const [type, setType] = useQueryState('type', parseAsString.withDefault('id'));

  return (
    <AuthLayout>
      <Box className="h-14 items-center justify-center">
        <Text>아이디/비밀번호 찾기</Text>
      </Box>
      <Box className="flex-col">
        <Tabs defaultValue={type}>
          <TabsList className="w-full h-14">
            <TabsTrigger value="id" onClick={() => setType('id')}>
              아이디 찾기
            </TabsTrigger>
            <TabsTrigger value="password" onClick={() => setType('password')}>
              비밀번호 찾기
            </TabsTrigger>
          </TabsList>
          <TabsContent value="id">
            <FindUserIdForm />
          </TabsContent>
          <TabsContent value="password">
            <FindUserPassWordForm />
          </TabsContent>
        </Tabs>
      </Box>
    </AuthLayout>
  );
}

export default Page;
