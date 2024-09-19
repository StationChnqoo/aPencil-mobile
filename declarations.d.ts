/**
 * 通常，TypeScript 的类型检查对代码文件（如 .ts、.tsx）有很好的支持
 * 但对静态资源（如图片）则缺少自动提示功能
 * 在项目的 src 或根目录下创建一个 declarations.d.ts 文件
 * 告诉 TypeScript 所有 .png 文件都是模块，因此可以被 import
 */
declare module '*.png' {
  const value: any;
  export default value;
}