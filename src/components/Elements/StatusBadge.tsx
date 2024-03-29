import { Badge, SystemStyleObject } from "@chakra-ui/react";

interface StatusBadgeProps {
  status: string;
  text: string;
  [x: string]: any;
}

const StatusBadge = ({ status, text, ...rest }: StatusBadgeProps) => {
  const badgeStyles: SystemStyleObject = {
    // py: "8px",
    // px: "10px",
    borderRadius: "4px",
    textTransform: "capitalize",
    
    fontWeight: 500,
    
  };

  switch (status?.toLowerCase()) {
    case "connected":
      return (
        <Badge sx={badgeStyles} colorScheme="green" fontSize="0.75rem" {...rest}>
          {text.toLowerCase()}
        </Badge>
      );
    case "not connected":
      return (
        <Badge sx={badgeStyles} colorScheme="blue" p="1rem" {...rest}>
          {text}
        </Badge>
      );
    case "standby":
      return (
        <Badge sx={badgeStyles} colorScheme="purple" p="1rem" {...rest}>
          {text}
        </Badge>
      );
    default:
      return (
        <Badge sx={badgeStyles} {...rest}>
          {text}
        </Badge>
      );
  }
};

export default StatusBadge;
