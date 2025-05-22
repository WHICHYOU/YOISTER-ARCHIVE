export interface FileMeta {
  path: string;
  type: "registry:component" | "registry:lib";
}

export interface ComponentMeta {
  name: string;
  title: string;
  type: "registry:component" | "registry:lib";
  description: string;
  files: FileMeta[];
}

export interface Category {
  name: string;
  slug: string;
  components: ComponentMeta[];
}
