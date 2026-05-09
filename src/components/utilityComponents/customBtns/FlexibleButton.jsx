'use client';

import { Button } from "@/components/ui/button";
import Icon from "../icon/Icon";

export default function FlexibleButton({
  label = "Click Me",
  iconName,            
  iconPosition = "left",
  variant = "solid",
  className = "",        
  paddingClass,         
  onClick,
}) {
  const baseStyle =
    "group flex  items-center justify-center gap-2 rounded-lg transition-all duration-300 font-medium";

  const solidStyle =
    "bg-[#4285F4] text-white hover:bg-[#1967d2] border border-transparent";

  const outlineStyle =
    "bg-transparent text-[#202124] border border-[#dadce0] hover:border-[#4285F4] hover:text-[#4285F4]";

  const defaultPadding = "px-4 py-3 md:px-6 md:py-4 lg:px-6 lg:py-[1.50rem]";

  
  const iconColorClass =
    variant === "outline" ? "group-hover:invert-[100%]" : "";

  return (
    <Button
      onClick={onClick}
      className={`${baseStyle} cursor-pointer ${
        variant === "outline" ? outlineStyle : solidStyle
      } ${paddingClass ? paddingClass : defaultPadding} ${className}`}
    >
      {iconPosition === "left" && iconName && <Icon name={iconName} colorClass={iconColorClass} />}
      <span>{label}</span>
      {iconPosition === "right" && iconName && <Icon name={iconName} colorClass={iconColorClass} />}
    </Button>
  );
}
