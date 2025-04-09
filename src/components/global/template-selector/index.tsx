import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
	onSelect: (value: string) => void;
}

export function TemplateSelector({ onSelect }: Props) {
	return (
		<ToggleGroup
			type="single"
			className="gap-2"
			onValueChange={(value) => {
				if (value) {
					onSelect(value);
				}
			}}
		>
			<ToggleGroupItem value="Health & Fitness" aria-label="Health & Fitness">
				Health & Fitness
			</ToggleGroupItem>
			<ToggleGroupItem value="Course Selling" aria-label="Course Selling">
				Course Selling
			</ToggleGroupItem>
			<ToggleGroupItem value="E-commerce" aria-label="E-commerce">
				E-commerce
			</ToggleGroupItem>
			<ToggleGroupItem value="Portfolio" aria-label="Portfolio">
				Portfolio
			</ToggleGroupItem>
			<ToggleGroupItem value="Blog" aria-label="Blog">
				Blog
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
