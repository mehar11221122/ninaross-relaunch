declare module "*.asset.json" {
  const value: {
    version: number;
    asset_id: string;
    project_id: string;
    url: string;
    [key: string]: unknown;
  };
  export default value;
}
