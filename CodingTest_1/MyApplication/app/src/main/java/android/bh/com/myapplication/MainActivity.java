package android.bh.com.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.logging.Logger;

public class MainActivity extends AppCompatActivity {


    private final String TAG = "BH_" + this.getClass().getSimpleName();
    private TextView mTextView2ShowCounterValue = null;

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView2ShowCounterValue = (TextView) findViewById(R.id.text_view_for_showing_coutner_value);

        final int result = counterFromJNI();
        mTextView2ShowCounterValue.setText(String.valueOf(result));

        findViewById(R.id.buttonForCounter).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                mTextView2ShowCounterValue.setText(String.valueOf(counterFromJNI()));
            }
        });

    }

    public native int counterFromJNI();

    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
    public native String stringFromJNI();
}
