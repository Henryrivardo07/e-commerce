type Props = { params: { id: string } };
export default function Page({ params }: Props) {
  return <div style={{ padding: 16 }}>Edit Product: {params.id}</div>;
}
