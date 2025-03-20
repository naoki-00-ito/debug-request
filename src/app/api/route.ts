export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify({ message: 'GET Request!' }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function POST() {
  return new Response(JSON.stringify({ message: 'POST Request!' }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function PUT() {
  return new Response(JSON.stringify({ message: 'PUT Request!' }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function DELETE() {
  return new Response(JSON.stringify({ message: 'DELETE Request!' }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
