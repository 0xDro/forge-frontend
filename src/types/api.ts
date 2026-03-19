export interface DesignOptions {
  style_hints?: string[] | null;
  color_palette?: string[] | null;
  background_color?: string | null;
}

export interface CreateDesignRequest {
  prompt: string;
  product_type: string;
  options?: DesignOptions | null;
}

export interface CreateDesignResponse {
  job_id: string;
  status: string;
  created_at: string;
}

export interface DesignSpecs {
  width_px: number;
  height_px: number;
  dpi: number;
  format: string;
}

export interface DesignResult {
  image_url: string;
  preview_url: string;
  specs: DesignSpecs;
  openwav_order_id?: string | null;
}

export interface FailureDetail {
  step: string;
  message: string;
}

export interface DesignDetailResponse {
  job_id: string;
  status: string;
  result?: DesignResult | null;
  failure?: FailureDetail | null;
  created_at: string;
  completed_at?: string | null;
}

export interface DesignStatusResponse {
  job_id: string;
  status: string;
  failure?: FailureDetail | null;
}

export interface ErrorDetail {
  code: string;
  message: string;
}

export interface ErrorResponse {
  error: ErrorDetail;
}

export type DesignStatus =
  | "pending"
  | "processing_prompt"
  | "generating_image"
  | "post_processing"
  | "submitting"
  | "completed"
  | "failed";

export type PipelineStep = 0 | 1 | 2 | 3;
