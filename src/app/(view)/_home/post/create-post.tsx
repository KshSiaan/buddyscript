"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Attachment02Icon,
  Calendar03Icon,
  ClipIcon,
  Image02Icon,
  LicenseIcon,
  Refresh01Icon,
  SentIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { gooeyToast } from "goey-toast";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useCreatePost } from "@/lib/api/post";
import { clientCompressImage } from "@/lib/extra";
export default function CreatePost() {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (expanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [expanded]);

  const { mutate: createPost, isPending } = useCreatePost();

  const submitPost = async () => {
    const compressedImages = await Promise.all(
      selectedImages.map((file) => clientCompressImage(file, 1)),
    );
    const allImages = compressedImages.filter((img) => img !== null) as File[];
    createPost({
      text: textareaRef.current?.value || "",
      images: allImages,
      is_private: false,
    });
  };
  return (
    <ExpandableScreen
      onExpandChange={setExpanded}
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="0px"
    >
      <div className="w-full">
        <ExpandableScreenTrigger className="w-full">
          <div className="p-4 bg-card rounded-lg w-full hover:border-primary border-2 border-transparent transition-colors cursor-pointer">
            <div className="flex gap-2 items-center justify-start">
              <Avatar size="lg">
                <AvatarImage
                  src={
                    "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="text-muted-foreground text-sm">
                Write something..
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-between pt-4">
              <div className="space-x-2">
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={Image02Icon} className="text-rose-600" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={Video01Icon} className="text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    className="text-green-600"
                  />
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon
                    icon={LicenseIcon}
                    className="text-purple-600"
                  />
                </Button>
                <Button size="icon-sm">
                  <HugeiconsIcon icon={SentIcon} />
                </Button>
              </div>
            </div>
          </div>
        </ExpandableScreenTrigger>
      </div>

      <ExpandableScreenContent className="bg-card">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 justify-start border-b pb-4 mb-4">
            <Avatar size="lg">
              <AvatarImage
                src={
                  "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                }
              />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>{" "}
            RAVEN
          </div>
          <textarea
            className="border-0! flex-1 ring-0! outline-0! resize-none scroll-fade-y scrollbar-none bg-transparent w-full text-sm font-light"
            ref={textareaRef}
            placeholder="Write here..."
          />
          <div className="w-full flex justify-between lg:justify-end items-center gap-4">
            <div className="space-x-4">
              <input
                type="file"
                id="image-input"
                className="hidden"
                multiple
                accept="image/*"
                ref={imageInputRef}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 5) {
                    gooeyToast.error("You can only select up to 5 images.");
                    return;
                  } else if (files && files.length > 0) {
                    setSelectedImages(Array.from(files));
                  }
                }}
              />

              {selectedImages.length === 0 ? (
                <label htmlFor="image-input">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs font-light text-rose-600"
                    onClick={() => {
                      imageInputRef.current?.click();
                    }}
                  >
                    <HugeiconsIcon icon={Image02Icon} />
                    <span className="hidden lg:block">Image</span>
                  </Button>
                </label>
              ) : (
                <Popover>
                  <PopoverTrigger
                    openOnHover
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs font-light text-rose-600"
                      />
                    }
                  >
                    <HugeiconsIcon icon={Image02Icon} />
                    <span className="hidden lg:block">
                      Selected Image{selectedImages.length > 1 ? "s" : ""}(
                      {selectedImages.length})
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-lg!">
                    <PopoverHeader className="flex flex-row! items-center justify-between">
                      <PopoverTitle>Selected Images:</PopoverTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedImages([]);
                        }}
                      >
                        <HugeiconsIcon icon={Refresh01Icon} />
                        Reset
                      </Button>
                    </PopoverHeader>
                    <div className="grid grid-cols-5 gap-4">
                      {selectedImages.map((file, index) => (
                        <Image
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index}`}
                          width={100}
                          height={100}
                          className="w-full h-full aspect-square object-contain rounded-lg"
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <Button
                variant="ghost"
                className="text-blue-500 text-xs font-light"
                disabled
                size="sm"
              >
                <HugeiconsIcon icon={Video01Icon} />
                <span className="hidden lg:block">Video</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="text-green-600 text-xs font-light"
              >
                <HugeiconsIcon icon={Calendar03Icon} />
                <span className="hidden lg:block">Event</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="text-purple-600 text-xs font-light"
              >
                <HugeiconsIcon icon={LicenseIcon} />
                <span className="hidden lg:block">Article</span>
              </Button>
            </div>
            <Button
              onClick={() => {
                submitPost();
              }}
              size="sm"
              className="text-xs"
            >
              Post <HugeiconsIcon icon={SentIcon} />
            </Button>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
