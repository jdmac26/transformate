"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { useEffect, useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"
import { updateCredits } from "@/lib/actions/user.actions"

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})

const GenerationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
    const transformationType = transformationTypes[type];
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        if (data || image) {
            const transformationUrl = getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig
            })

            const imageData = {
                title: values.title,
                publicId: image?.publicId,
                transformationType: type,
                width: image?.width,
                height: image?.height,
                config: transformationConfig,
                secureURL: image?.secureURL,
                transformationURL: transformationUrl,
                aspectRatio: values.aspectRatio,
                prompt: values.prompt,
                color: values.color,
            }

            if (action === 'Add') {
                try {
                    const newImage = await addImage({
                        image: imageData,
                        userId,
                        path: '/'
                    })

                    if (newImage) {
                        form.reset()
                        setImage(data)
                        router.push(`/transformations/${newImage._id}`)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        setIsSubmitting(false)
    }

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prevState: any) => ({
            ...prevState,
            aspectRatio: imageSize.aspectRatio,
            width: imageSize.width,
            height: imageSize.height,
        }))

        setNewTransformation(transformationType.config);

        return onChangeField(value)
    }

    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                ...prevState,
                [type]: {
                    ...prevState?.[type],
                    [fieldName === 'prompt' ? 'prompt' : 'to']: value
                }
            }))
        }, 1000)();

        return onChangeField(value)
    }

    const onTransformHandler = async () => {
        setIsTransforming(true)

        setTransformationConfig(
            deepMergeObjects(newTransformation, transformationConfig)
        )

        setNewTransformation(null)

        startTransition(async () => {
            await updateCredits(userId, creditFee)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
                <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Image Title"
                    className="w-full"
                    render={({ field }) => <Input {...field} className="input-field" />}
                />
                {(type === 'generate' ) && (
                    <div className="flex flex-col gap-5 lg:flex-r">
                        <CustomField
                            control={form.control}
                            name="prompt"
                            formLabel="Image Generation Prompt"
                            className="w-full"
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    className="rounded-[16px] border-2 border-purple-200/20 shadow-sm shadow-purple-200/15  disabled:opacity-100 font-semibold text-[16px] leading-[140%] h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                                    onChange={(e) => onInputChangeHandler(
                                        'prompt',
                                        e.target.value,
                                        type,
                                        field.onChange
                                    )}
                                />
                            )}
                        />
                        <CustomField
                            control={form.control}
                            name="aspectRatio"
                            formLabel="Aspect Ratio"
                            className="w-full"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 rounded-[16px] h-[50px] md:h-[54px] font-semibold text-[16px] leading-[140%] disabled:opacity-100  px-4 py-3 focus:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-0 focus-visible:outline-none">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(aspectRatioOptions).map((key) => (
                                            <SelectItem key={key} value={key} className="py-3 cursor-pointer hover:bg">
                                                {aspectRatioOptions[key as AspectRatioKey].label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                    </div>
                )}

                <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
                    {/* <CustomField
                        control={form.control}
                        name="publicId"
                        className="flex size-full flex-col"
                        render={({ field }) => (
                            <MediaUploader
                                onValueChange={field.onChange}
                                setImage={setImage}
                                publicId={field.value}
                                image={image}
                                type={type}
                            />
                        )}
                    />

                    <TransformedImage
                        image={image}
                        type={type}
                        title={form.getValues().title}
                        isTransforming={isTransforming}
                        setIsTransforming={setIsTransforming}
                        transformationConfig={transformationConfig}
                    /> */}
                    --- Generated Image Appears Here ---
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        className="bg-purple-gradient bg-cover py-4 px-6 font-semibold text-[16px] leading-[140%] h-[50px] w-full md:h-[54px] capitalize"
                        disabled={isTransforming || newTransformation === null}
                        onClick={onTransformHandler}
                    >
                        {isTransforming ? 'Generating...' : 'Generate Image'}
                    </Button>
                    <Button
                        type="submit"
                        className="bg-purple-gradient bg-cover py-4 px-6 font-semibold text-[16px] leading-[140%] h-[50px] w-full md:h-[54px] capitalize"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Save Image'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default GenerationForm