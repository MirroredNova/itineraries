import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript-eslint';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...ts.configs.recommended,
  prettierConfigRecommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
