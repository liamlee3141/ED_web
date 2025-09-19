Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { name, email, phone, projectType, budgetRange, message } = await req.json();

        // Validate required fields
        if (!name || !email || !message) {
            throw new Error('Name, email, and message are required fields');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // Get environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        console.log('Processing contact form submission:', { name, email, projectType });

        // Insert inquiry into database
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone?.trim() || null,
                project_type: projectType || null,
                budget_range: budgetRange || null,
                message: message.trim(),
                status: 'new',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            console.error('Database insert failed:', errorText);
            throw new Error(`Failed to save inquiry: ${errorText}`);
        }

        const inquiryData = await insertResponse.json();
        console.log('Contact inquiry saved successfully:', inquiryData[0]?.id);

        const result = {
            data: {
                success: true,
                message: 'Your inquiry has been submitted successfully. We will contact you soon.',
                inquiryId: inquiryData[0]?.id,
                timestamp: new Date().toISOString()
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Contact form submission error:', error);

        const errorResponse = {
            error: {
                code: 'CONTACT_FORM_FAILED',
                message: error.message,
                timestamp: new Date().toISOString()
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});