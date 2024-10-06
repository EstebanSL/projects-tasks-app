import React from "react";
import { ButtonComponent } from "../../../components";
import { useProjects } from "../../../hooks";
import { useModals } from "../../../hooks/useModals";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const PreviewPartnerCard = ({ partner }: any) => {
  const { handleModalDeletePartnerVisibility } = useModals();

  const getInitials = (name: string) => {
    return name && typeof name === "string"
      ? name.charAt(0).toUpperCase()
      : "?";
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src="/images/default-avatar.png"
              alt={partner.username}
            />
            <AvatarFallback>{getInitials(partner.username)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{partner.email || "Unknown"}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{partner.username || "unknown"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleModalDeletePartnerVisibility(partner)}
          aria-label={`Remove ${partner.username || "collaborator"} from collaborators`}
        >
          <Trash2Icon className="w-4 h-4 mr-2" />
          Remove
        </Button>
      </CardFooter>
    </Card>
    // <div>
    //   <p>{partner.username}</p>
    //   <ButtonComponent
    //     addtionalStyles="bg-red-500"
    //     btnText="Delete"
    //     type="button"
    //     onClick={() => handleModalDeletePartnerVisibility(partner)}
    //   ></ButtonComponent>
    // </div>
  );
};
