"use client";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
  useExpandableScreen,
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
import { useCreatePost } from "@/hooks/api/post";
import { clientCompressImage, fallbackMyAvatar } from "@/lib/extra";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function CreatePost() {
  const { data: session } = useSession();
  const [expanded, setExpanded] = React.useState(false);
  const [submitState, setSubmitState] = React.useState<
    "idle" | "compressing" | "submitting"
  >("idle");
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const navig = useRouter();
  useEffect(() => {
    if (!expanded) return;
    if (!textareaRef.current) return;

    const draft = localStorage.getItem("draft");
    if (!draft) return;

    const { text, is_private } = JSON.parse(draft);

    textareaRef.current.value = text;
    setIsPrivate(is_private);

    textareaRef.current.focus();
  }, [expanded]);

  const { mutate: createPost, isPending } = useCreatePost();

  const submitPost = async () => {
    if (selectedImages.length > 5) {
      gooeyToast.error("You can only select up to 5 images.");
      return;
    }
    if (selectedImages.length === 0 && !textareaRef.current?.value) {
      gooeyToast.error("Please enter some text or select an image.");
      return;
    }
    setSubmitState("compressing");
    const compressedImages = await Promise.all(
      selectedImages.map((file) => clientCompressImage(file, 1)),
    ).catch((err) => {
      gooeyToast.error("Failed to compress images.");
      setSubmitState("idle");
      return [];
    });

    setSubmitState("submitting");
    const allImages = compressedImages.filter((img) => img !== null) as File[];

    createPost(
      {
        text: textareaRef.current?.value || "",
        images: allImages,
        is_private: isPrivate,
      },
      {
        onSuccess: (res) => {
          setSubmitState("idle");
          setSelectedImages([]);
          if (textareaRef.current) {
            textareaRef.current.value = "";
          }
          setIsPrivate(false);
          gooeyToast.success(res?.message || "Post created successfully!");
          navig.refresh();
          setExpanded(false);
        },
        onError: (err) => {
          gooeyToast.error(err?.message || "Failed to create post");
          setSubmitState("idle");
        },
      },
    );
  };
  return (
    <ExpandableScreen
      onBeforeCollapse={() => {
        localStorage.setItem(
          "draft",
          JSON.stringify({
            text: textareaRef.current?.value ?? "",
            is_private: isPrivate,
          }),
        );
      }}
      expanded={expanded}
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
                <AvatarImage src={session?.user?.image ?? fallbackMyAvatar} />
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
                <Button size="icon-sm" disabled={isPending}>
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
              <AvatarImage src={session?.user?.image ?? fallbackMyAvatar} />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>{" "}
            {session?.user?.name ?? "User"}
          </div>
          <textarea
            className="border-0! flex-1 ring-0! outline-0! resize-none scroll-fade-y scrollbar-none bg-transparent w-full text-sm font-light"
            ref={textareaRef}
            placeholder="Write here..."
          />
          <div className="w-full flex justify-between lg:justify-end items-center gap-4">
            <div className="p-2 rounded-lg space-x-2 flex items-center justify-center border-2 border-muted-foreground/20 text-xs">
              <span>Public</span>
              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                className="data-checked:bg-foreground! bg-primary!"
              />
              <span>Private</span>
            </div>
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
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner />{" "}
                  {submitState === "compressing"
                    ? "Minifying Images..."
                    : "Submitting..."}
                </>
              ) : (
                <>
                  Post <HugeiconsIcon icon={SentIcon} />
                </>
              )}
            </Button>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
