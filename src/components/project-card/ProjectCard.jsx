import React, { forwardRef } from 'react';
import Badge from "@/components/badge/Badge";
import DecryptedText from "@/components/text/DecryptedText";
import { cn } from "@/lib/utils";

const ProjectCard = forwardRef(({
    bgImage,
    previewImage,
    category,
    title,
    year,
    tags = ["Development"],
    videoElement,
    className
}, ref) => {
    return (
        <div className={cn("space-y-2", className)}>
            {/* 卡片容器 */}
            <div
                ref={ref}
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md p-7 sm:p-9 xl:p-18"
            >

                {/* 背景图 */}
                <img
                    src={bgImage}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out"
                />

                {/* 视频/内容容器 */}
                <div className="relative z-10 w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-100/90 shadow-2xl">
                    {videoElement ? (
                        videoElement
                    ) : previewImage ? (
                        <img
                            src={previewImage}
                            alt={title}
                            className="h-full w-full object-cover object-top"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                            Video Placeholder
                        </div>
                    )}
                </div>
            </div>

            {/* 底部信息 */}
            <div className="flex flex-col justify-between gap-y-4 lg:flex-row">

                {/* 左侧标题区 */}
                <div className="flex flex-col gap-y-2">
                    <DecryptedText
                        once={false}
                        stagger={48}
                        duration={330}
                        scrambleSpeed={34}
                        className="block font-mono font-medium text-secondary-foreground/70 tracking-tight leading-none uppercase"
                    >
                        {category}
                    </DecryptedText>
                    <DecryptedText
                        once={false}
                        stagger={48}
                        duration={330}
                        scrambleSpeed={34}
                        className="block text-[clamp(27px,2.5vw,43px)] font-semibold leading-none tracking-tighter"
                    >
                        {title}
                    </DecryptedText>
                </div>

                {/* 右侧标签区 */}
                <div className="flex items-end gap-x-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                    <Badge variant="filled">
                        {year}
                    </Badge>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
