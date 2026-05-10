export interface CommonMutationParams {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}
