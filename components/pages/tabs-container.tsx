"use client";

import { Version1Form } from "@/components/pages/version1";
import { Version2Form } from "@/components/pages/version2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsContainer = () => {
  return (
    <Tabs defaultValue="version2">
      <TabsList>
        <TabsTrigger value="version1">Version 1</TabsTrigger>
        <TabsTrigger value="version2">Version 2</TabsTrigger>
      </TabsList>
      <TabsContent value="version1">
        <Version1Form />
      </TabsContent>
      <TabsContent value="version2">
        <Version2Form />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
