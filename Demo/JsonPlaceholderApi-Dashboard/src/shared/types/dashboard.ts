import type { TypedUseQueryHookResult } from "@reduxjs/toolkit/query/react";

export interface StatDefinition {
  id: number;
  title: string;
  to: string;
  icon: React.ReactNode;
  useQueryHook: () => TypedUseQueryHookResult<any, any, any>;
}
