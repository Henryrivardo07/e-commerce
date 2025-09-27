type Props = { params: { id: string } };
export default function Page({ params }: Props) {
  return (
    <div style={{ padding: 16 }}>Product Detail (Public): {params.id}</div>
  );
}
