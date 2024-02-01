import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const client = useQueryClient();
  const { mutate: updateSetting, isLoading: isLoadingUpdateSetting } =
    useMutation({
      mutationFn: (setting) => updateSettingApi(setting),
      onSuccess: () => {
        toast.success("Successfully updated");
        client.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (error) => toast.error("Something went wrong"),
    });

  return { updateSetting, isLoadingUpdateSetting };
}
